import React, { useState, useEffect } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';
import '../styles/ModalAdmin.css'; 

interface ModalEditarProductoProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    producto: VerProductoDTO | null;
}

const ModalEditarProducto: React.FC<ModalEditarProductoProps> = ({ isOpen, onClose, onSuccess, producto }) => {
    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('Agaporni');
    const [precio, setPrecio] = useState(0);
    const [imagenesBase64, setImagenesBase64] = useState<string[]>([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (producto && isOpen) {
            setNombre(producto.nombre);
            setStock(producto.stock);
            setDescripcion(producto.descripcion);
            setCategoria(producto.categoria || 'Agaporni');
            setPrecio(producto.precio);
            setImagenesBase64(producto.contenidoImagenes || []);
        }
    }, [producto, isOpen]);

    // ⌨️ Soporte WCAG: Cerrar ventana pulsando la tecla Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen || !producto) return null;

    const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const promises = filesArray.map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result as string;
                        const cleanBase64 = base64String.replace(/^data:image\/[a-z]+;base64,/, "");
                        resolve(cleanBase64);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((results) => {
                setImagenesBase64(results); 
            });
        }
    };

    const handleActualizar = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);

        const datosActualizados: NuevoProductoDTO = {
            nombre,
            stock,
            descripcion,
            categoria,
            precio,
            contenidoImagenes: imagenesBase64
        };

        try {
            await productoService.actualizar(producto.id_producto, datosActualizados);
            alert('¡Producto actualizado con éxito!');
            onSuccess();
            onClose();   
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("No se pudieron guardar los cambios.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <div 
                className="admin-modal-box"
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-editar-producto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 🌟 Botón adaptado a tu clase accesible de cierre en esquina */}
                <button 
                    className="admin-modal-close-x" 
                    onClick={onClose}
                    aria-label="Cerrar modal de edición"
                >
                    &times;
                </button>

                <h2 id="titulo-editar-producto">✏️ Editar Producto</h2>
                
                <form onSubmit={handleActualizar} className="admin-modal-form">
                    
                    <div className="admin-modal-group">
                        <label htmlFor="edit-nombre">Nombre del Producto:</label>
                        <input 
                            id="edit-nombre"
                            type="text" 
                            className="admin-field"
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="admin-modal-group">
                        <label htmlFor="edit-categoria">Categoría:</label>
                        <select 
                            id="edit-categoria"
                            className="admin-field"
                            value={categoria} 
                            onChange={(e) => setCategoria(e.target.value)}
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

                    {/* Fila Doble mapeada con .admin-modal-row */}
                    <div className="admin-modal-row">
                        <div className="admin-modal-group">
                            <label htmlFor="edit-stock">Stock:</label>
                            <input 
                                id="edit-stock"
                                type="number" 
                                className="admin-field"
                                value={stock} 
                                onChange={(e) => setStock(parseInt(e.target.value) || 0)} 
                                required 
                                min="0" 
                            />
                        </div>
                        <div className="admin-modal-group">
                            <label htmlFor="edit-precio">Precio (€):</label>
                            <input 
                                id="edit-precio"
                                type="number" 
                                step="0.01" 
                                className="admin-field"
                                value={precio} 
                                onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)} 
                                required 
                                min="0" 
                            />
                        </div>
                    </div>

                    <div className="admin-modal-group">
                        <label htmlFor="edit-descripcion">Descripción:</label>
                        <textarea 
                            id="edit-descripcion"
                            className="admin-field"
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="admin-modal-group">
                        <label htmlFor="edit-file-imagenes">Imágenes del Producto:</label>
                        <div className="file-upload-wrapper">
                            <input 
                                id="edit-file-imagenes"
                                type="file" 
                                className="input-file-hidden"
                                multiple 
                                accept="image/*" 
                                onChange={handleImagenChange} 
                            />
                            {/* Reutiliza el botón estilizado custom sin romper la accesibilidad del input nativo */}
                            <div className="admin-btn-cancel" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: 0 }} aria-hidden="true">
                                📁 Elegir nuevas fotos
                            </div>
                        </div>
                    </div>
                    
                    {/* Contenedor de miniaturas adaptado a .admin-image-preview-zone y .admin-thumb */}
                    {imagenesBase64.length > 0 && (
                        <div className="admin-image-preview-zone">
                            {imagenesBase64.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img.startsWith('http') ? img : `data:image/jpeg;base64,${img}`} 
                                    alt="Vista previa miniatura" 
                                    className="admin-thumb" 
                                />
                            ))}
                            <button 
                                type="button" 
                                onClick={() => setImagenesBase64([])} 
                                className="admin-btn-clear-images"
                            >
                                Quitar Fotos
                            </button>
                        </div>
                    )}

                    <div className="admin-modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="admin-btn-cancel" 
                            disabled={cargando}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="admin-btn-submit" 
                            disabled={cargando}
                        >
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarProducto;