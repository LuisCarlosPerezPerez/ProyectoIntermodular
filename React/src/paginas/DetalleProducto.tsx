import React, { useState, useEffect } from 'react';
import { usePedido } from './PedidoContext'; 
import { VerProductoDTO } from '../types/Producto';
import { authService } from '../Services/authServicio'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/ModalDetalleProducto.css'; 

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
        if (!authService.isLogged()) {
            alert("¡Atención! Debes iniciar sesión para poder añadir productos al carrito de Alas de Cristal.");
            navigate('/Autenticacion');
            onClose(); 
            return;
        }

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

            <div className="cristal-modal-overlay" onClick={onClose}>
                <div 
                    className="cristal-modal-box" 
                    role="dialog" 
                    aria-modal="true"
                    aria-labelledby="modal-detalle-titulo"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        className="cristal-modal-close-x" 
                        onClick={onClose}
                        aria-label="Cerrar detalles del producto"
                    >
                        &times;
                    </button>

                    <h2 id="modal-detalle-titulo" className="cristal-modal-titulo">
                        Detalles del Producto
                    </h2>

                    <div className="cristal-modal-form">
                        
                        <div className="cristal-modal-group centrar-contenido">
                            <div 
                                className="cristal-contenedor-visor"
                                onClick={() => setZoomAbierto(true)}
                                title="Haz clic para ver la imagen en grande"
                            >
                                <img 
                                    src={formatearImagen(producto.contenidoImagenes?.[fotoActiva])} 
                                    alt={producto.nombre} 
                                    className="cristal-imagen-principal"
                                />
                                <div className="cristal-badge-zoom">
                                    🔍 Ampliar
                                </div>
                            </div>

                            {producto.contenidoImagenes && producto.contenidoImagenes.length > 1 && (
                                <div className="cristal-image-preview-zone">
                                    {producto.contenidoImagenes.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={formatearImagen(img)}
                                            alt={`Miniatura ${idx + 1}`}
                                            className={`cristal-thumb ${fotoActiva === idx ? 'activa' : ''}`}
                                            onClick={() => setFotoActiva(idx)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="cristal-modal-group">
                            <span className="cristal-producto-categoria" >
                                {producto.categoria || 'Aves'}
                            </span>
                            <h3 className="cristal-producto-nombre">{producto.nombre}</h3>
                            <span className="cristal-producto-precio">
                                {producto.precio.toFixed(2)}€
                            </span>
                        </div>

                        <div className="cristal-modal-group">
                            <label className="cristal-modal-label">Descripción:</label>
                            <p className="cristal-producto-descripcion">
                                {producto.descripcion}
                            </p>
                        </div>

                        <div className="cristal-modal-group">
                            <div>
                                <span className={`cristal-stock-badge ${producto.stock > 0 ? 'en-stock' : 'agotado'}`}>
                                    {producto.stock > 0 ? `🟢 En Stock: ${producto.stock} unidades` : '🔴 Agotado temporalmente'}
                                </span>
                            </div>
                        </div>

                        {producto.stock > 0 && (
                            <div className="cristal-modal-row contenedor-compra">
                                <div className="cristal-modal-group">
                                    <label htmlFor="modal-cantidad" className="cristal-modal-label">Cantidad:</label>
                                    <input 
                                        id="modal-cantidad"
                                        type="number" 
                                        className="cristal-field-input"
                                        value={cantidad}
                                        min="1"
                                        max={producto.stock}
                                        onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, parseInt(e.target.value) || 1)))}
                                    />
                                </div>
                                <div className="bloque-boton-añadir">
                                    <button 
                                        type="button" 
                                        className="btn-cristal-submit"
                                        onClick={handleAñadirAlCarrito}
                                    >
                                        🛒 Añadir a la Cesta
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="cristal-modal-actions">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="btn-cristal-cancelar"
                                style={{ width: producto.stock > 0 ? 'auto' : '100%' }}
                            >
                                Volver a la Tienda
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {zoomAbierto && (
                <div className="cristal-zoom-overlay" onClick={() => setZoomAbierto(false)}>
                    <button 
                        className="cristal-zoom-close"
                        onClick={() => setZoomAbierto(false)}
                    >
                        &times;
                    </button>
                    <img 
                        src={formatearImagen(producto.contenidoImagenes?.[fotoActiva])} 
                        alt={`${producto.nombre} en grande`} 
                        className="cristal-zoom-imagen"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </>
    );
};

export default ModalDetalleProducto;