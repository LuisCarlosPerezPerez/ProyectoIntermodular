import React, { useState, useEffect } from 'react';
import { usePedido } from './PedidoContext'; 
import { VerProductoDTO } from '../types/Producto';
import { authService } from '../Services/authServicio'; // Importamos tu servicio de autenticación
import { useNavigate } from 'react-router-dom'; // Importamos para poder redirigir si no está logueado
import '../styles/ModalAdmin.css'; 

interface ModalDetalleProductoProps {
    isOpen: boolean;
    onClose: () => void;
    producto: VerProductoDTO | null;
}

const ModalDetalleProducto: React.FC<ModalDetalleProductoProps> = ({ isOpen, onClose, producto }) => {
    const navigate = useNavigate(); 
    const { carritoItems, agregarProducto } = usePedido();
    const [cantidad, setCantidad] = useState<number>(1);
    const [fotoActiva, setFotoActiva] = useState<number>(0);
    
    // Estado para controlar la imagen maximizada en pantalla completa
    const [zoomAbierto, setZoomAbierto] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setCantidad(1);
            setFotoActiva(0);
            setZoomAbierto(false); 
        }
    }, [producto, isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                if (zoomAbierto) setZoomAbierto(false);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, zoomAbierto]);

    if (!isOpen || !producto) return null;

    const formatearImagen = (base64String: string | undefined) => {
        if (!base64String) return '/Imagenes/placeholder.jpg';
        return base64String.startsWith('http') ? base64String : `data:image/jpeg;base64,${base64String}`;
    };

    const handleAñadirAlCarrito = () => {
        // 🌟 REQUISITO 1: Bloquear la compra si el usuario no ha iniciado sesión
        if (!authService.isLogged()) {
            alert("¡Atención! Debes iniciar sesión para poder añadir productos al carrito de Alas de Cristal.");
            navigate('/Autenticacion');
            onClose(); 
            return;
        }

        // 🌟 REQUISITO 2: Prohibir añadir al carrito a Empleados y Administradores
        if (authService.esStaff() || authService.esAdmin()) {
            alert("Acceso denegado: Las cuentas de Administrador y Staff no pueden realizar compras ni añadir productos a la cesta.");
            return;
        }

        const itemEnCarrito = carritoItems.find(item => item.id_producto === producto.id_producto);
        const cantidadPrevia = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        if (cantidadPrevia + cantidad > producto.stock) {
            alert(`No puedes añadir más unidades. Ya tienes ${cantidadPrevia} en la cesta y el stock máximo es de ${producto.stock} u.`);
            return;
        }

        agregarProducto({
            id_producto: producto.id_producto,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            cantidad: cantidad,
            imagen: producto.contenidoImagenes?.[0]
        });

        alert(`¡Se han añadido ${cantidad} unidad(es) de "${producto.nombre}" a la cesta! 🦜`);
        onClose();
    };

    return (
        <>
            <div className="admin-modal-overlay" onClick={onClose}>
                <div 
                    className="admin-modal-box" 
                    role="dialog" 
                    aria-modal="true"
                    aria-labelledby="modal-detalle-titulo"
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: '600px' }} 
                >
                    <button 
                        className="admin-modal-close-x" 
                        onClick={onClose}
                        aria-label="Cerrar detalles del producto"
                    >
                        &times;
                    </button>

                    <h2 id="modal-detalle-titulo">🔍 Detalles del Producto</h2>

                    <div className="admin-modal-form">
                        <div className="admin-modal-group" style={{ alignItems: 'center' }}>
                            
                            {/* Contenedor con evento clic para ampliar la imagen principal */}
                            <div 
                                style={{ 
                                    width: '100%', 
                                    height: '220px', 
                                    borderRadius: '12px', 
                                    overflow: 'hidden', 
                                    border: '1px solid rgba(204, 174, 255, 0.2)', 
                                    marginBottom: '10px',
                                    cursor: 'pointer', 
                                    position: 'relative'
                                }}
                                onClick={() => setZoomAbierto(true)}
                                title="Haz clic para ver la imagen en grande"
                            >
                                <img 
                                    src={formatearImagen(producto.contenidoImagenes?.[fotoActiva])} 
                                    alt={producto.nombre} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute', bottom: '8px', right: '8px', 
                                    backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', 
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem'
                                }}>
                                    🔍 Ampliar
                                </div>
                            </div>

                            {producto.contenidoImagenes && producto.contenidoImagenes.length > 1 && (
                                <div className="admin-image-preview-zone" style={{ justifyContent: 'center', width: '100%' }}>
                                    {producto.contenidoImagenes.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={formatearImagen(img)}
                                            alt={`Miniatura ${idx + 1}`}
                                            className="admin-thumb"
                                            style={{ 
                                                cursor: 'pointer', 
                                                border: fotoActiva === idx ? '2px solid #7bf0ff' : '1px solid rgba(123, 240, 255, 0.3)',
                                                transform: fotoActiva === idx ? 'scale(1.08)' : 'none'
                                            }}
                                            onClick={() => setFotoActiva(idx)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="admin-modal-group">
                            <span style={{ fontSize: '0.8rem', color: '#7bf0ff', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                {producto.categoria || 'Aves'}
                            </span>
                            <h3 style={{ color: '#ffffff', margin: '4px 0 0 0', fontSize: '1.4rem' }}>{producto.nombre}</h3>
                            <span style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 'bold', marginTop: '5px' }}>
                                {producto.precio.toFixed(2)}€
                            </span>
                        </div>

                        <div className="admin-modal-group">
                            <label>Descripción:</label>
                            <p style={{ color: '#e2daf0', fontSize: '0.95rem', margin: 0, lineHeight: '1.4', opacity: 0.85 }}>
                                {producto.descripcion}
                            </p>
                        </div>

                        <div className="admin-modal-group">
                            <div>
                                <span 
                                    className="admin-field-help" 
                                    style={{ 
                                        backgroundColor: producto.stock > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        color: producto.stock > 0 ? '#10b981' : '#f87171',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        display: 'inline-block'
                                    }}
                                >
                                    {producto.stock > 0 ? `🟢 En Stock: ${producto.stock} unidades` : '🔴 Agotado temporalmente'}
                                </span>
                            </div>
                        </div>

                        {producto.stock > 0 && (
                            <div className="admin-modal-row" style={{ alignItems: 'center', marginTop: '10px' }}>
                                <div className="admin-modal-group">
                                    <label htmlFor="modal-cantidad">Cantidad:</label>
                                    <input 
                                        id="modal-cantidad"
                                        type="number" 
                                        className="admin-field"
                                        value={cantidad}
                                        min="1"
                                        max={producto.stock}
                                        onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, parseInt(e.target.value) || 1)))}
                                    />
                                </div>
                                <div style={{ alignSelf: 'end' }}>
                                    <button 
                                        type="button" 
                                        className="admin-btn-submit"
                                        onClick={handleAñadirAlCarrito}
                                        style={{ width: '100%', padding: '12px' }}
                                    >
                                        🛒 Añadir a la Cesta
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="admin-modal-actions" style={{ marginTop: '20px' }}>
                            <button type="button" onClick={onClose} className="admin-btn-cancel" style={{ width: producto.stock > 0 ? 'auto' : '100%' }}>
                                Volver a la Tienda
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌟 SUB-MODAL DE ZOOM COMPLETO (Corregido con zIndex masivo para pasar por encima del original) */}
            {zoomAbierto && (
                <div 
                    style={{
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100vw', 
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.95)', 
                        display: 'flex',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        zIndex: 100000, // 👈 Forzamos la máxima prioridad visual sobre el modal base
                        backdropFilter: 'blur(8px)'
                    }}
                    onClick={() => setZoomAbierto(false)}
                >
                    <button 
                        onClick={() => setZoomAbierto(false)}
                        style={{
                            position: 'absolute', top: '20px', right: '20px',
                            background: 'none', border: 'none', color: '#fff',
                            fontSize: '3rem', cursor: 'pointer', zIndex: 100001
                        }}
                    >
                        &times;
                    </button>
                    <img 
                        src={formatearImagen(producto.contenidoImagenes?.[fotoActiva])} 
                        alt={`${producto.nombre} en grande`} 
                        style={{ 
                            maxWidth: '95vw', 
                            maxHeight: '95vh', 
                            objectFit: 'contain', 
                            borderRadius: '8px',
                            boxShadow: '0 0 30px rgba(0,0,0,0.7)'
                        }}
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </>
    );
};

export default ModalDetalleProducto;