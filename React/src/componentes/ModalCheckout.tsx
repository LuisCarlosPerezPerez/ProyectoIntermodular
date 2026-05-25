import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { pedidoService } from '../Services/PedidoServicio'; // Ajusta la ruta a tu archivo de servicios
import type { PedidoDTO } from '../types/Pedido';
import '../styles/ModalAdmin.css';
import { authService } from '../Services/authServicio';

interface CartItem {
    id_producto: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

interface ModalCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    carritoItems: CartItem[];
    total: number;
    onPaymentSuccess: () => void;
}

const ModalCheckout: React.FC<ModalCheckoutProps> = ({ isOpen, onClose, carritoItems, total, onPaymentSuccess }) => {
    const [cargando, setCargando] = useState(false);
    
    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [expiracion, setExpiracion] = useState('');
    const [cvv, setCvv] = useState('');

    if (!isOpen) return null;

    const generarTicketPDF = (idPedidoSimulado: number) => {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(0, 173, 181);
        doc.text("ALAS DE CRISTAL", 14, 25);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.setFont("Helvetica", "normal");
        doc.text("Tienda Oficial de Aves y Accesorios", 14, 32);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 37);
        doc.text(`Pedido ID: #000${idPedidoSimulado}`, 14, 42);
        
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(34, 40, 49);
        doc.text("DATOS DE ENVÍO Y CONTACTO", 14, 55);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Cliente: ${nombre}`, 14, 62);
        doc.text(`Dirección: ${direccion}`, 14, 67);
        doc.text(`Teléfono: ${telefono}`, 14, 72);
        
        doc.setFont("Helvetica", "bold");
        doc.text("RESUMEN DE COMPRA", 14, 85);
        
        let yPos = 95;
        doc.setFontSize(10);
        doc.text("Producto", 14, yPos);
        doc.text("Cant.", 120, yPos);
        doc.text("Precio", 150, yPos);
        doc.text("Total", 180, yPos);
        doc.line(14, yPos + 2, 195, yPos + 2);
        yPos += 10;
        
        doc.setFont("Helvetica", "normal");
        carritoItems.forEach((item) => {
            doc.text(item.nombre, 14, yPos);
            doc.text(item.cantidad.toString(), 124, yPos);
            doc.text(`${item.precio.toFixed(2)}€`, 150, yPos);
            doc.text(`${(item.precio * item.cantidad).toFixed(2)}€`, 180, yPos);
            yPos += 8;
        });
        
        doc.line(14, yPos, 195, yPos);
        doc.setFont("Helvetica", "bold");
        doc.text("TOTAL PAGADO:", 130, yPos + 10);
        doc.setTextColor(0, 173, 181);
        doc.text(`${total.toFixed(2)}€`, 180, yPos + 10);
        
        doc.save(`Ticket_AlasDeCristal_${idPedidoSimulado}.pdf`);
    };

    const handlePagoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);

        // 1. Usamos tu authService oficial para obtener el usuario activo de 'usuario_sesion'
        const usuarioActivo = authService.getUsuario();

        // 2. Extraemos de forma segura el ID según las variables que devuelva tu base de datos
        // (Suele ser id, id_cliente o id_empleado dependiendo del rol logueado)
        const idClienteLogueado = usuarioActivo 
            ? (usuarioActivo.id_cliente || usuarioActivo.id_empleado || usuarioActivo.id || 0) 
            : 0;

        // 3. Validación de seguridad robusta
        if (idClienteLogueado === 0) {
            alert("Error: No se detectó una sesión de usuario activa. Vuelve a iniciar sesión.");
            setCargando(false);
            return;
        }

        // Agrupación de productos repetidos en listas paralelas ordenadas
        const mapaProductos = new Map<number, number>();
        carritoItems.forEach(item => {
            const cantActual = mapaProductos.get(item.id_producto) || 0;
            mapaProductos.set(item.id_producto, cantActual + item.cantidad);
        });

        const productosUnicos = Array.from(mapaProductos.keys());
        const cantidadesTotales = Array.from(mapaProductos.values());

        // Mapeo estructurado hacia el DTO correspondiente para Spring Boot
        const nuevoPedido: PedidoDTO = {
            id: 0, 
            entrega: direccion, 
            telefono: parseInt(telefono),
            estado: "Pendiente",
            productos: productosUnicos,
            cantidades: cantidadesTotales,
            id_cliente: idClienteLogueado, // 👈 Ahora enviará el ID real extraído
            precioTotal: total
        };

        try {
            // Envío controlado a través de la capa de servicios autorizada
            const resultado = await pedidoService.crearPedido(nuevoPedido);
            
            // Si el backend procesó el registro y nos devolvió la entidad mapeada con su ID real
            const idRealPedido = resultado.id || Math.floor(Math.random() * 90000) + 10000;
            
            generarTicketPDF(idRealPedido);
            
            alert("¡Compra realizada con éxito! Tu pedido ha sido registrado.");
            onPaymentSuccess(); // Esto limpia los estados del pedido global en memoria
            onClose();
        } catch (error: any) {
            console.error("Error al tramitar el pago:", error);
            alert(error.message || "Error en la conexión con el servidor al crear tu pedido.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-box">
                <span className="admin-modal-close-x" onClick={onClose}>&times;</span>
                <h2>💳 Finalizar Compra</h2>
                
                <form onSubmit={handlePagoSubmit} className="admin-modal-form">
                    <div className="admin-modal-group">
                        <label>Nombre y Apellidos</label>
                        <input type="text" className="admin-field" value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Juan Pérez Gómez" />
                    </div>

                    <div className="admin-modal-row">
                        <div className="admin-modal-group">
                            <label>Dirección Completa</label>
                            <input type="text" className="admin-field" value={direccion} onChange={e => setDireccion(e.target.value)} required placeholder="Calle Mayor Nº 10, 2ºA" />
                        </div>
                        <div className="admin-modal-group">
                            <label>Teléfono Móvil</label>
                            <input 
                                type="text" 
                                className="admin-field" 
                                value={telefono} 
                                maxLength={9} 
                                onChange={e => setTelefono(e.target.value.replace(/\D/g, ''))} 
                                required 
                                placeholder="600123456" 
                            />
                        </div>
                    </div>

                    <div className="admin-modal-group">
                        <label>Número de Tarjeta</label>
                        <input type="text" className="admin-field" maxLength={16} value={tarjeta} onChange={e => setTarjeta(e.target.value.replace(/\D/g, ''))} required placeholder="4000 1234 5678 9010" />
                    </div>

                    <div className="admin-modal-row">
                        <div className="admin-modal-group">
                            <label>Fecha Expiración</label>
                            <input type="text" className="admin-field" maxLength={5} value={expiracion} onChange={e => setExpiracion(e.target.value)} required placeholder="MM/AA" />
                        </div>
                        <div className="admin-modal-group">
                            <label>CVV</label>
                            <input type="text" className="admin-field" maxLength={3} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} required placeholder="123" />
                        </div>
                    </div>

                    <div className="admin-modal-actions">
                        <button type="button" className="admin-btn-cancel" onClick={onClose} disabled={cargando}>
                            Modificar Carrito
                        </button>
                        <button type="submit" className="admin-btn-submit" disabled={cargando}>
                            {cargando ? 'Validando...' : `Pagar ${total.toFixed(2)} €`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCheckout;