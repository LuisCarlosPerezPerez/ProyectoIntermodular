import React, { useState, useEffect } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';
import '../styles/ModalAdmin.css'; // 👈 IMPORTANTE: Vincula el nuevo archivo CSS aquí

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
        <div className="modal-overlay-admin">
            <div className="modal-content-admin">
                <h2>✏️ Editar Producto</h2>
                
                <form onSubmit={handleActualizar} className="admin-form">
                    
                    <div className="form-group">
                        <label>Nombre del Producto:</label>
                        <input 
                            type="text" 
                            className="admin-input"
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoría:</label>
                        <select 
                            className="admin-select"
                            value={categoria} 
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <optgroup label="🦜 AVES">
                                <option value="Agaporni">Agapornis</option>
                                <option value="Ninfa">Ninfas</option>
                                <option value="Periquito">Periquitos</option>
                            </optgroup>
                            <optgroup label="🌾 COMIDA">
                                <option value="Comida Agaporni">Comida Agaporni</option>
                                <option value="Comida Ninfa">Comida Ninfa</option>
                                <option value="Comida Periquito">Comida Periquito</option>
                            </optgroup>
                            <optgroup label="🏠 ACCESORIOS">
                                <option value="Jaulas">Jaulas</option>
                                <option value="Bebederos y Comederos">Bebederos y Comederos</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="form-row-double">
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                type="number" 
                                className="admin-input"
                                value={stock} 
                                onChange={(e) => setStock(parseInt(e.target.value) || 0)} 
                                required 
                                min="0" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio (€):</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                className="admin-input"
                                value={precio} 
                                onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)} 
                                required 
                                min="0" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea 
                            className="admin-textarea"
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            rows={4} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Imágenes del Producto:</label>
                        <div className="file-upload-wrapper">
                            <button type="button" className="btn-custom-upload">
                                📁 Elegir nuevas fotos
                            </button>
                            <input 
                                type="file" 
                                className="input-file-hidden"
                                multiple 
                                accept="image/*" 
                                onChange={handleImagenChange} 
                            />
                        </div>
                    </div>
                    
                    {imagenesBase64.length > 0 && (
                        <div className="admin-preview-container">
                            {imagenesBase64.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img.startsWith('http') ? img : `data:image/jpeg;base64,${img}`} 
                                    alt="preview" 
                                    className="admin-preview-img" 
                                />
                            ))}
                            <button type="button" onClick={() => setImagenesBase64([])} className="btn-admin-clear-pics">
                                ❌ Quitar Fotos
                            </button>
                        </div>
                    )}

                    <div className="admin-modal-actions">
                        <button type="button" onClick={onClose} className="btn-admin-cancel" disabled={cargando}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-admin-submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarProducto;