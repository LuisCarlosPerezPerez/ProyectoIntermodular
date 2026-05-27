import React, { useEffect, useState } from 'react';
import { pedidoService } from '../Services/PedidoServicio'; 
import '../styles/ModalPedidos.css'; 

interface PedidoDelHistorial {
    id: number;
    entrega: string; 
    telefono: number;
    estado: string;  
    preciototal: number; 
    direccion: string; 
    id_cliente: number;
}

interface ModalPedidosProps {
    isOpen: boolean;
    onClose: () => void;
    idCliente: number;
}

const ModalPedidos: React.FC<ModalPedidosProps> = ({ isOpen, onClose, idCliente }) => {
    const [pedidos, setPedidos] = useState<PedidoDelHistorial[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen && idCliente > 0) {
            setCargando(true);
            pedidoService.listarPorCliente(idCliente)
                .then((data: any) => {
                    setPedidos(data || []);
                })
                .catch(error => {
                    console.error("❌ Error al pedir historial:", error);
                })
                .finally(() => {
                    setCargando(false);
                });
        }
    }, [isOpen, idCliente]);

    // Soporte de accesibilidad para cerrar con la tecla Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="pedidos-modal-overlay" onClick={onClose}>
            <div 
                className="pedidos-modal-box" 
                role="dialog" 
                aria-modal="true" 
                aria-labelledby="pedidos-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón X que ahora hereda tus estilos con focus-visible */}
                <button 
                    className="admin-modal-close-x" 
                    onClick={onClose}
                    aria-label="Cerrar historial de pedidos"
                >
                    &times;
                </button>
                
                <h2 id="pedidos-titulo">Mis Pedidos</h2>
                
                <div className="pedidos-scroll-area">
                    {cargando ? (
                        <p className="texto-buscando">
                            Buscando tu historial en la base de datos...
                        </p>
                    ) : pedidos.length > 0 ? (
                        pedidos.map((p) => (
                            <div key={p.id} className="pedido-item">
                                {/* Mapeado con h4 para enlazar con tu .pedido-item h4 (Cian #7bf0ff) */}
                                <h4>Pedido #{p.id}</h4>
                                
                                <p>
                                    <strong>Estado en tienda:</strong>{' '}
                                    <span className={`estado-tag ${p.estado?.toLowerCase().replace('...', '') || 'pendiente'}`}>
                                        {p.estado}
                                    </span>
                                </p>
                                
                                <p><strong>Dirección de Envío:</strong> {p.direccion || 'Recogida en tienda'}</p>
                                
                                <p><strong>Fecha Estimada de Entrega:</strong> {p.entrega ? new Date(p.entrega).toLocaleDateString('es-ES') : 'Pendiente'}</p>
                                
                                <p><strong>Teléfono de contacto:</strong> {p.telefono}</p>
                                
                                {p.preciototal !== undefined && (
                                    <p>
                                        <strong>Total Facturado:</strong>{' '}
                                        <span className="pedido-total">{p.preciototal.toFixed(2)}€</span>
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="pedidos-vacios-contenedor">
                            <p className="pedidos-vacios-mensaje">
                                No tienes pedidos realizados aún.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalPedidos;