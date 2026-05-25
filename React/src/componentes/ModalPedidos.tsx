import React, { useEffect, useState } from 'react';
import { pedidoService } from '../Services/PedidoServicio'; 
import '../styles/ModalPedidos.css'; 

// Forzamos la interfaz local para que use los mismos nombres de propiedad 
// exactos que estás inyectando en el Map de tu Java (ImplementacionCliente.java)
interface PedidoDelHistorial {
    id: number;
    entrega: string; // Tu backend mete: pedido.getEntrega().toString() o "Sin fecha"
    telefono: number;
    estado: string;  // Tu backend mete: "Realizando..." o "Comprando..."
    preciototal: number; // Tu backend usa: map.put("preciototal", pedido.getPreciototal())
    id_cliente: number;
}

interface ModalPedidosProps {
    isOpen: boolean;
    onClose: () => void;
    idCliente: number;
}

const ModalPedidos: React.FC<ModalPedidosProps> = ({ isOpen, onClose, idCliente }) => {
    // Usamos el tipo corregido para que TypeScript reconozca el "preciototal" en minúsculas
    const [pedidos, setPedidos] = useState<PedidoDelHistorial[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    useEffect(() => {
        // Log para auditar si el componente padre le pasa un idCliente válido al abrirse
        console.log("✈️ [DEBUG HISTORIAL] ¿Modal Abierto?:", isOpen, " | ID Cliente enviado:", idCliente);

        if (isOpen && idCliente > 0) {
            setCargando(true);
            
            pedidoService.listarPorCliente(idCliente)
                .then((data: any) => {
                    console.log("📦 [DEBUG HISTORIAL] Datos crudos que llegaron de Java:", data);
                    // Aseguramos guardar la lista, si llega nula inicializamos array vacío
                    setPedidos(data || []);
                })
                .catch(error => {
                    console.error("❌ [DEBUG HISTORIAL] Fallo crítico al pedir historial:", error);
                })
                .finally(() => {
                    setCargando(false);
                });
        }
    }, [isOpen, idCliente]);

    if (!isOpen) return null;

    return (
        <div className="pedidos-modal-overlay">
            <div className="pedidos-modal-box">
                {/* Botón de cierre */}
                <span className="admin-modal-close-x" onClick={onClose}>&times;</span>
                
                <h2>Mis Pedidos</h2>
                
                <div className="pedidos-scroll-area">
                    {cargando ? (
                        <p style={{ textAlign: 'center', color: '#718096', padding: '20px' }}>
                            Buscando tu historial en la base de datos...
                        </p>
                    ) : pedidos.length > 0 ? (
                        pedidos.map((p) => (
                            <div key={p.id} className="pedido-item" style={{ borderLeft: '5px solid #00adb5' }}>
                                <h4>Pedido #{p.id}</h4>
                                <p><strong>Estado en tienda:</strong> <span className={`estado-tag ${p.estado.toLowerCase().replace('...', '')}`}>{p.estado}</span></p>
                                <p><strong>Dirección / Entrega:</strong> {p.entrega}</p>
                                <p><strong>Teléfono de contacto:</strong> {p.telefono}</p>
                                {p.preciototal !== undefined && (
                                    <p><strong>Total Facturado:</strong> <span style={{ color: '#00adb5', fontWeight: 'bold' }}>{p.preciototal.toFixed(2)}€</span></p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '30px 10px', textAlign: 'center' }}>
                            <p style={{ color: '#718096', margin: 0, fontSize: '1.1rem' }}>
                                No tienes pedidos realizados aún.
                            </p>
                            <small style={{ color: '#a0aec0', display: 'block', marginTop: '5px' }}>
                                (Si acabas de pagar uno, asegúrate de que se guardó en la BD con tu ID de cliente #{idCliente})
                            </small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalPedidos;