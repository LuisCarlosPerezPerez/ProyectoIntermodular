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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="pedidos-cristal-overlay" onClick={onClose}>
            <div 
                className="pedidos-cristal-box" 
                role="dialog" 
                aria-modal="true" 
                aria-labelledby="pedidos-modal-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="pedidos-cristal-close-x" 
                    onClick={onClose}
                    aria-label="Cerrar historial de pedidos"
                >
                    &times;
                </button>
                
                <h2 id="pedidos-modal-titulo" className="pedidos-cristal-titulo">Mis Pedidos</h2>
                
                <div className="pedidos-cristal-scroll">
                    {cargando ? (
                        <div className="pedidos-cristal-estado-info">
                            <span className="spinner-sutil"></span>
                            <p className="texto-buscando">
                                Buscando tu historial en la base de datos...
                            </p>
                        </div>
                    ) : pedidos.length > 0 ? (
                        pedidos.map((p) => (
                            <div key={p.id} className="pedido-cristal-item">
                                <div className="pedido-cristal-header">
                                    <h4>Pedido #{p.id}</h4>
                                    <span className={`estado-tag tag-${p.estado?.toLowerCase().replace(/\./g, '').trim() || 'pendiente'}`}>
                                        {p.estado}
                                    </span>
                                </div>
                                
                                <div className="pedido-cristal-detalles">
                                    <p><strong>📍 Dirección:</strong> {p.direccion || 'Recogida en tienda'}</p>
                                    <p><strong>📅 Entrega estimada:</strong> {p.entrega ? new Date(p.entrega).toLocaleDateString('es-ES') : 'Pendiente'}</p>
                                    <p><strong>📞 Contacto:</strong> {p.telefono}</p>
                                </div>
                                
                                {p.preciototal !== undefined && (
                                    <div className="pedido-cristal-footer">
                                        <span>Total Facturado:</span>
                                        <span className="pedido-total-monto">{p.preciototal.toFixed(2)}€</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="pedidos-vacios-contenedor">
                            <p className="pedidos-vacios-mensaje">
                                📦 No tienes pedidos realizados aún.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalPedidos;