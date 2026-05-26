import React, { useEffect, useState } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO } from '../types/Producto';
import "../styles/ModalNuevoProducto.css"; 

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

    // ⌨️ Soporte WCAG: Cerrar ventana pulsando la tecla Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

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
        <div className="modal-overlay-admin" onClick={onClose}>
            <div 
                className="modal-content-admin"
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-nuevo-producto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 🌟 Botón adaptado a tu clase .admin-close-x con soporte accesible */}
                <button 
                    className="admin-close-x" 
                    onClick={onClose}
                    aria-label="Cerrar modal de nuevo producto"
                >
                    &times;
                </button>
                
                <h2 id="titulo-nuevo-producto">✨ Nuevo Producto</h2>
                
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label htmlFor="input-nombre">Nombre del Producto</label>
                        <input 
                            id="input-nombre"
                            type="text" 
                            className="admin-input" 
                            value={nuevoProd.nombre}
                            onChange={e => setNuevoProd({...nuevoProd, nombre: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="select-categoria">Categoría</label>
                        <select 
                            id="select-categoria"
                            className="admin-select"
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

                    <div className="form-row-double">
                        <div className="form-group">
                            <label htmlFor="input-precio">Precio (€)</label>
                            <input 
                                id="input-precio"
                                type="number" 
                                step="0.01" 
                                className="admin-input" 
                                value={nuevoProd.precio === 0 ? '' : nuevoProd.precio}
                                onChange={e => {
                                    const val = parseFloat(e.target.value);
                                    setNuevoProd({...nuevoProd, precio: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-stock">Stock Inicial</label>
                            <input 
                                id="input-stock"
                                type="number" 
                                className="admin-input" 
                                value={nuevoProd.stock === 0 ? '' : nuevoProd.stock}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setNuevoProd({...nuevoProd, stock: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="txt-descripcion">Descripción</label>
                        <textarea 
                            id="txt-descripcion"
                            className="admin-textarea" 
                            value={nuevoProd.descripcion}
                            onChange={e => setNuevoProd({...nuevoProd, descripcion: e.target.value})} 
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-file-imagenes">Imágenes del Producto</label>
                        {/* 🌟 Input de subida premium adaptado a tu wrapper de CSS */}
                        <div className="file-upload-wrapper">
                            <input 
                                id="input-file-imagenes"
                                type="file" 
                                className="input-file-hidden" 
                                multiple 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                            <div className="btn-custom-upload" aria-hidden="true">
                                📁 Seleccionar archivos...
                            </div>
                        </div>
                        <span className="admin-help-text">Puedes seleccionar varias fotos a la vez.</span>
                    </div>

                    {nuevoProd.contenidoImagenes.length > 0 && (
                        <div className="admin-preview-container">
                            {nuevoProd.contenidoImagenes.map((img, i) => (
                                <img 
                                    key={i} 
                                    src={`data:image/jpeg;base64,${img}`} 
                                    alt="Vista previa miniatura" 
                                    className="admin-preview-img" 
                                />
                            ))}
                            <button 
                                type="button" 
                                className="btn-admin-clear-pics" 
                                onClick={() => setNuevoProd({...nuevoProd, contenidoImagenes: []})}
                            >
                                Quitar Todas
                            </button>
                        </div>
                    )}

                    <div className="admin-modal-actions">
                        <button 
                            type="button" 
                            className="btn-admin-cancel" 
                            onClick={onClose} 
                            disabled={cargando}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-admin-submit" 
                            disabled={cargando}
                        >
                            {cargando ? 'Guardando...' : 'Añadir Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoProducto;