import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { pedidoService } from '../Services/PedidoServicio'; 
import type { PedidoDTO } from '../types/Pedido';
import '../styles/ModalCheckout.css'; 
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

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [expiracion, setExpiracion] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !cargando) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, cargando]);

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

    const handleExpiracionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value.replace(/\D/g, ''); 
        if (valor.length > 2) {
            valor = `${valor.substring(0, 2)}/${valor.substring(2, 4)}`;
        }
        setExpiracion(valor);
    };

    const handlePagoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cargando) return; 
        setCargando(true);

        const usuarioActivo = authService.getUsuario();

        const idClienteLogueado = usuarioActivo 
            ? (usuarioActivo.id_cliente || usuarioActivo.id_empleado || usuarioActivo.id || 0) 
            : 0;

        if (idClienteLogueado === 0) {
            alert("Error: No se detectó una sesión de usuario activa. Vuelve a iniciar sesión.");
            setCargando(false);
            return;
        }

        const mapaProductos = new Map<number, number>();
        carritoItems.forEach(item => {
            const cantActual = mapaProductos.get(item.id_producto) || 0;
            mapaProductos.set(item.id_producto, cantActual + item.cantidad);
        });

        const productosUnicos = Array.from(mapaProductos.keys());
        const cantidadesTotales = Array.from(mapaProductos.values());

        const nuevoPedido: PedidoDTO = {
            id: 0, 
            direccion: direccion,
            entrega: new Date().toISOString(), 
            telefono: Number(telefono), 
            estado: "Pendiente",
            productos: productosUnicos,
            cantidades: cantidadesTotales,
            id_cliente: idClienteLogueado, 
            precioTotal: total
        };

        try {
            const resultado = await pedidoService.crearPedido(nuevoPedido);
            const idRealPedido = resultado && resultado.id ? resultado.id : Math.floor(Math.random() * 90000) + 10000;
            
            generarTicketPDF(idRealPedido);
            
            alert("¡Compra realizada con éxito! Tu pedido ha sido registrado.");
            onPaymentSuccess(); 
            onClose();
        } catch (error: any) {
            console.error("Error al tramitar el pago:", error);
            alert(error.message || "Error en la conexión con el servidor al crear tu pedido.");
        } finally {
            setCargando(false);
        }
    };

    const handleOverlayClick = () => {
        if (!cargando) onClose();
    };

    return (
        <div className="cristal-modal-overlay" onClick={handleOverlayClick}>
            <div 
                className="cristal-modal-box"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="cristal-modal-close-x" 
                    onClick={onClose}
                    disabled={cargando}
                    aria-label="Cerrar ventana de pago"
                >
                    &times;
                </button>

                <h2 className="cristal-modal-titulo">Finalizar Compra</h2>
                
                <form onSubmit={handlePagoSubmit} className="cristal-modal-form">
                    
                    <div className="cristal-modal-group">
                        <label htmlFor="checkout-nombre" className="cristal-modal-label">Nombre y Apellidos</label>
                        <input 
                            id="checkout-nombre" 
                            type="text" 
                            className="cristal-field-input" 
                            value={nombre} 
                            onChange={e => setNombre(e.target.value)} 
                            required 
                            placeholder="Juan Pérez Gómez" 
                            disabled={cargando} 
                        />
                    </div>

                    <div className="cristal-modal-row">
                        <div className="cristal-modal-group">
                            <label htmlFor="checkout-direccion" className="cristal-modal-label">Dirección Completa</label>
                            <input 
                                id="checkout-direccion" 
                                type="text" 
                                className="cristal-field-input" 
                                value={direccion} 
                                onChange={e => setDireccion(e.target.value)} 
                                required 
                                placeholder="Calle Mayor Nº 10, 2ºA" 
                                disabled={cargando} 
                            />
                        </div>
                        <div className="cristal-modal-group">
                            <label htmlFor="checkout-telefono" className="cristal-modal-label">Teléfono Móvil</label>
                            <input 
                                id="checkout-telefono"
                                type="text" 
                                className="cristal-field-input" 
                                value={telefono} 
                                maxLength={9} 
                                onChange={e => setTelefono(e.target.value.replace(/\D/g, ''))} 
                                required 
                                placeholder="600123456" 
                                disabled={cargando}
                            />
                        </div>
                    </div>

                    <div className="cristal-modal-group">
                        <label htmlFor="checkout-tarjeta" className="cristal-modal-label">Número de Tarjeta</label>
                        <input 
                            id="checkout-tarjeta" 
                            type="text" 
                            className="cristal-field-input" 
                            maxLength={16} 
                            value={tarjeta} 
                            onChange={e => setTarjeta(e.target.value.replace(/\D/g, ''))} 
                            required 
                            placeholder="4000123456789010" 
                            disabled={cargando} 
                        />
                    </div>

                    <div className="cristal-modal-row">
                        <div className="cristal-modal-group">
                            <label htmlFor="checkout-expiracion" className="cristal-modal-label">Fecha Expiración</label>
                            <input 
                                id="checkout-expiracion"
                                type="text" 
                                className="cristal-field-input" 
                                maxLength={5} 
                                value={expiracion} 
                                onChange={handleExpiracionChange} 
                                required 
                                placeholder="MM/AA" 
                                disabled={cargando}
                            />
                        </div>
                        <div className="cristal-modal-group">
                            <label htmlFor="checkout-cvv" className="cristal-modal-label">CVV</label>
                            <input 
                                id="checkout-cvv" 
                                type="text" 
                                className="cristal-field-input" 
                                maxLength={3} 
                                value={cvv} 
                                onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} 
                                required 
                                placeholder="123" 
                                disabled={cargando} 
                            />
                        </div>
                    </div>

                    <div className="cristal-modal-actions">
                        <button 
                            type="button" 
                            className="btn-cristal-cancelar" 
                            onClick={onClose} 
                            disabled={cargando}
                        >
                            Modificar Carrito
                        </button>
                        <button 
                            type="submit" 
                            className="btn-cristal-submit" 
                            disabled={cargando}
                        >
                            {cargando ? 'Validando Pago...' : `Pagar ${total.toFixed(2)} €`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCheckout;