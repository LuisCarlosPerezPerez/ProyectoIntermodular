import React, { useState, useEffect } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';
import '../styles/ModalEditarProducto.css';

interface ModalEditarProductoProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    producto: VerProductoDTO | null;
}

const ModalEditarProducto: React.FC<ModalEditarProductoProps> = ({ isOpen, onClose, onSuccess, producto }) => {
    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState<number | string>(0);
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('Agaporni');
    const [precio, setPrecio] = useState<number | string>(0);
    const [imagenesBase64, setImagenesBase64] = useState<string[]>([]);
    
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState<Record<string, string>>({});
    
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string>('');
    const [zoomAbierto, setZoomAbierto] = useState<boolean>(false);

    // Componente auxiliar para mensajes de error
    const ErrorLabel = ({ mensaje }: { mensaje?: string }) => 
        mensaje ? <span style={{ color: '#8b0000', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{mensaje}</span> : null;

    useEffect(() => {
        if (producto && isOpen) {
            setNombre(producto.nombre);
            setStock(producto.stock);
            setDescripcion(producto.descripcion);
            setCategoria(producto.categoria || 'Agaporni');
            setPrecio(producto.precio);
            
            const imagenes = producto.contenidoImagenes || [];
            setImagenesBase64(imagenes);
            setImagenSeleccionada(imagenes.length > 0 ? imagenes[0] : '');
            setErrores({});
        }
    }, [producto, isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !cargando) {
                if (zoomAbierto) {
                    setZoomAbierto(false);
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, cargando, zoomAbierto]);

    if (!isOpen || !producto) return null;

    const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const promises = filesArray.map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        // SOLUCIÓN AL BUG: Extraer el base64 limpio como en ModalNuevoProducto
                        const base64Completo = reader.result as string;
                        const base64Limpio = base64Completo.includes(',') ? base64Completo.split(',')[1] : base64Completo;
                        resolve(base64Limpio);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((results) => {
                setImagenesBase64(results); 
                if (results.length > 0) {
                    setImagenSeleccionada(results[0]);
                }
            });
        }
    };

    const handleOverlayClick = () => {
        if (!cargando) onClose();
    };

    const handleActualizar = async (e: React.FormEvent) => {
        e.preventDefault();
        const nuevosErrores: Record<string, string> = {};

        if (nombre.trim().length < 3) nuevosErrores.nombre = "El nombre es demasiado corto.";
        if (Number(precio) <= 0) nuevosErrores.precio = "El precio debe ser mayor a 0.";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setCargando(true);
        setErrores({});

        const datosActualizados: NuevoProductoDTO = {
            nombre,
            stock: Number(stock) || 0,
            descripcion,
            categoria,
            precio: Number(precio) || 0,
            contenidoImagenes: imagenesBase64
        };

        try {
            await productoService.actualizar(producto.id_producto, datosActualizados);
            onSuccess();
            onClose();   
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            setErrores({ global: "No se pudieron guardar los cambios. Revisa tu conexión o inténtalo de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    const obtenerSrcImagen = (imgStr: string) => {
        if (!imgStr) return '';
        return imgStr.startsWith('data:') || imgStr.startsWith('http') 
            ? imgStr 
            : `data:image/jpeg;base64,${imgStr}`;
    };

    return (
        <>
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
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>

                    <h2 className="cristal-modal-titulo">Editar Producto</h2>
                    
                    <form onSubmit={handleActualizar} className="cristal-modal-form">

                        {imagenSeleccionada && (
                            <div className="cristal-modal-group">
                                <span className="cristal-modal-label">Vista Previa Actual</span>
                                <div className="cristal-contenedor-visor" onClick={() => setZoomAbierto(true)}>
                                    <img 
                                        src={obtenerSrcImagen(imagenSeleccionada)} 
                                        alt="Vista principal del producto" 
                                        className="cristal-imagen-principal"
                                    />
                                    <div className="cristal-badge-zoom">🔍 Click para ampliar</div>
                                </div>
                            </div>
                        )}

                        {imagenesBase64.length > 0 && (
                            <div className="cristal-modal-group">
                                <div className="cristal-image-preview-zone">
                                    {imagenesBase64.map((img, index) => (
                                        <img 
                                            key={index} 
                                            src={obtenerSrcImagen(img)} 
                                            alt={`Miniatura ${index + 1}`} 
                                            className={`cristal-thumb ${imagenSeleccionada === img ? 'activa' : ''}`}
                                            onClick={() => setImagenSeleccionada(img)}
                                        />
                                    ))}
                                    <button 
                                        type="button" 
                                        onClick={() => { setImagenesBase64([]); setImagenSeleccionada(''); }} 
                                        className="admin-btn-clear-images"
                                        disabled={cargando}
                                    >
                                        Quitar todas las fotos
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="cristal-modal-group">
                            <label htmlFor="edit-file-imagenes" className="cristal-modal-label">Subir nuevas imágenes:</label>
                            <div className="file-upload-wrapper">
                                <input 
                                    id="edit-file-imagenes"
                                    type="file" 
                                    className="input-file-hidden"
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleImagenChange} 
                                    disabled={cargando}
                                />
                                <div className="btn-cristal-cancelar" style={{ display: 'flex', width: '100%', justifyContent: 'center', boxSizing: 'border-box'}} aria-hidden="true">
                                    📁 Cambiar Colección de Fotos
                                </div>
                            </div>
                        </div>

                        <div className="cristal-modal-group">
                            <label htmlFor="edit-nombre" className="cristal-modal-label">Nombre del Producto</label>
                            <input 
                                id="edit-nombre"
                                type="text" 
                                className="cristal-field-input"
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                                disabled={cargando}
                            />
                            <ErrorLabel mensaje={errores.nombre} />
                        </div>

                        <div className="cristal-modal-group">
                            <label htmlFor="edit-categoria" className="cristal-modal-label">Categoría</label>
                            <select 
                                id="edit-categoria"
                                className="cristal-field-input"
                                value={categoria} 
                                onChange={(e) => setCategoria(e.target.value)}
                                disabled={cargando}
                            >
                                <optgroup label="PARROT 🦜 AVES">
                                    <option value="Agaporni">Agapornis</option>
                                    <option value="Ninfa">Ninfas</option>
                                    <option value="Periquito">Periquitos</option>
                                </optgroup>
                                <optgroup label="GRAIN 🌾 COMIDA">
                                    <option value="Comida Agaporni">Comida Agaporni</option>
                                    <option value="Comida Ninfa">Comida Ninfa</option>
                                    <option value="Comida Periquito">Comida Periquito</option>
                                </optgroup>
                                <optgroup label="HOME 🏠 ACCESORIOS">
                                    <option value="Jaulas">Jaulas</option>
                                    <option value="Bebederos y Comederos">Bebederos y Comederos</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="cristal-modal-row">
                            <div className="cristal-modal-group">
                                <label htmlFor="edit-stock" className="cristal-modal-label">Stock disponible</label>
                                <input 
                                    id="edit-stock"
                                    type="number" 
                                    className="cristal-field-input"
                                    value={stock} 
                                    onChange={(e) => setStock(e.target.value === '' ? '' : parseInt(e.target.value))} 
                                    required 
                                    min="0" 
                                    disabled={cargando}
                                />
                            </div>
                            <div className="cristal-modal-group">
                                <label htmlFor="edit-precio" className="cristal-modal-label">Precio Unitario (€)</label>
                                <input 
                                    id="edit-precio"
                                    type="number" 
                                    step="0.01" 
                                    className="cristal-field-input"
                                    value={precio} 
                                    onChange={(e) => setPrecio(e.target.value === '' ? '' : parseFloat(e.target.value))} 
                                    required 
                                    min="0.01" 
                                    disabled={cargando}
                                />
                                <ErrorLabel mensaje={errores.precio} />
                            </div>
                        </div>

                        <div className="cristal-modal-group">
                            <label htmlFor="edit-descripcion" className="cristal-modal-label">Descripción Técnica</label>
                            <textarea 
                                id="edit-descripcion"
                                className="cristal-field-input"
                                style={{ minHeight: '90px', resize: 'vertical' }}
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                                required 
                                disabled={cargando}
                            />
                        </div>

                        <ErrorLabel mensaje={errores.global} />

                        <div className="cristal-modal-actions">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="btn-cristal-cancelar" 
                                disabled={cargando}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="btn-cristal-submit" 
                                disabled={cargando}
                            >
                                {cargando ? 'Guardando Cambios...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {zoomAbierto && imagenSeleccionada && (
                <div className="cristal-zoom-overlay" onClick={() => setZoomAbierto(false)}>
                    <button className="cristal-zoom-close" onClick={() => setZoomAbierto(false)}>&times;</button>
                    <img 
                        src={obtenerSrcImagen(imagenSeleccionada)} 
                        alt="Zoom del Producto" 
                        className="cristal-zoom-imagen"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </>
    );
};

export default ModalEditarProducto;