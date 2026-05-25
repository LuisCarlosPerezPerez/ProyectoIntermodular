import React, { useState } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO } from '../types/Producto';
import "../styles/ModalNuevoProducto.css"; // 👈 Asegúrate de que apunte al CSS de arriba

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalNuevoProducto: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    const [cargando, setCargando] = useState(false);
    
    const [nuevoProd, setNuevoProd] = useState<NuevoProductoDTO>({
        nombre: '',
        stock: 0,
        descripcion: '',
        categoria: '', 
        precio: 0,
        contenidoImagenes: []
    });

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const promesas = Array.from(files).map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Completo = reader.result as string;
                        const base64Limpio = base64Completo.split(',')[1];
                        resolve(base64Limpio);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promesas).then(imagenes => {
                setNuevoProd(prev => ({ ...prev, contenidoImagenes: imagenes }));
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nuevoProd.categoria) {
            alert("Por favor, selecciona una categoría.");
            return;
        }

        setCargando(true);
        try {
            await productoService.crear(nuevoProd);
            onSuccess();
            onClose();
            setNuevoProd({ nombre: '', stock: 0, descripcion: '', categoria: '', precio: 0, contenidoImagenes: [] });
        } catch (error) {
            alert("Error al guardar el producto.");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-box">
                <span className="admin-modal-close-x" onClick={onClose}>&times;</span>
                
                <h2>✨ Nuevo Producto</h2>
                
                <form onSubmit={handleSubmit} className="admin-modal-form">
                    <div className="admin-modal-group">
                        <label>Nombre del Producto</label>
                        <input 
                            type="text" 
                            className="admin-field" 
                            value={nuevoProd.nombre}
                            onChange={e => setNuevoProd({...nuevoProd, nombre: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="admin-modal-group">
                        <label>Categoría</label>
                        <select 
                            className="admin-field"
                            value={nuevoProd.categoria}
                            onChange={e => setNuevoProd({...nuevoProd, categoria: e.target.value})}
                            required
                        >
                            <option value="" disabled>-- Selecciona una categoría --</option>
                            <option value="Agaporni">Agaporni</option>
                            <option value="Ninfa">Ninfa</option>
                            <option value="Periquito">Periquito</option>
                            <option value="Comida Agaporni">Comida Agaporni</option>
                            <option value="Comida Ninfa">Comida Ninfa</option>
                            <option value="Comida Periquito">Comida Periquito</option>
                            <option value="Jaulas">Jaulas</option>
                            <option value="Bebederos y Comederos">Bebederos y Comederos</option>
                        </select>
                    </div>

                    <div className="admin-modal-row">
                        <div className="admin-modal-group">
                            <label>Precio (€)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                className="admin-field" 
                                value={nuevoProd.precio === 0 ? '' : nuevoProd.precio}
                                onChange={e => {
                                    const val = parseFloat(e.target.value);
                                    setNuevoProd({...nuevoProd, precio: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                        <div className="admin-modal-group">
                            <label>Stock Inicial</label>
                            <input 
                                type="number" 
                                className="admin-field" 
                                value={nuevoProd.stock === 0 ? '' : nuevoProd.stock}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setNuevoProd({...nuevoProd, stock: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="admin-modal-group">
                        <label>Descripción</label>
                        <textarea 
                            className="admin-field" 
                            value={nuevoProd.descripcion}
                            onChange={e => setNuevoProd({...nuevoProd, descripcion: e.target.value})} 
                            required
                        ></textarea>
                    </div>

                    <div className="admin-modal-group">
                        <label>Imágenes</label>
                        <input 
                            type="file" 
                            className="admin-field" 
                            multiple 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                        <span className="admin-field-help">Puedes seleccionar varias fotos a la vez.</span>
                    </div>

                    {nuevoProd.contenidoImagenes.length > 0 && (
                        <div className="admin-image-preview-zone">
                            {nuevoProd.contenidoImagenes.map((img, i) => (
                                <img key={i} src={`data:image/jpeg;base64,${img}`} alt="" className="admin-thumb" />
                            ))}
                            <button type="button" className="admin-btn-clear-images" onClick={() => setNuevoProd({...nuevoProd, contenidoImagenes: []})}>
                                Quitar Todas
                            </button>
                        </div>
                    )}

                    <div className="admin-modal-actions">
                        <button type="button" className="admin-btn-cancel" onClick={onClose} disabled={cargando}>
                            Cancelar
                        </button>
                        <button type="submit" className="admin-btn-submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : 'Añadir Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoProducto;