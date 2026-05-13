import React, { useState } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO } from '../types/Producto';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalNuevoProducto: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    // Estado para controlar el bloqueo del botón mientras se guarda
    const [cargando, setCargando] = useState(false);
    
    const [nuevoProd, setNuevoProd] = useState<NuevoProductoDTO>({
        nombre: '',
        stock: 0,
        descripcion: '',
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
                        // QUITAMOS el prefijo data:image/... para compatibilidad con el backend
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
        setCargando(true); // Deshabilitar botones para evitar envíos duplicados
        
        try {
            await productoService.crear(nuevoProd);
            onSuccess(); // Refrescar la lista de la tienda
            onClose();   // Cerrar el modal
            // Limpiar el formulario para la próxima vez
            setNuevoProd({ nombre: '', stock: 0, descripcion: '', precio: 0, contenidoImagenes: [] });
        } catch (error) {
            alert("Error al guardar el producto. Por favor, revisa los datos.");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="overlay" style={{ display: 'block' }}>
            <div className="modal-contenido" style={{ width: '500px', textAlign: 'left' }}>
                <span className="cerrar-modal" onClick={onClose}>&times;</span>
                
                <h2 className="mb-3" style={{ color: 'black', fontSize: '24px' }}>Nuevo Producto</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Nombre del Producto</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={nuevoProd.nombre}
                            onChange={e => setNuevoProd({...nuevoProd, nombre: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="row mb-2">
                        <div className="col-6">
                            <label className="form-label small fw-bold">Precio (€)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                className="form-control" 
                                // Usamos una cadena vacía si es 0 para que sea más fácil de escribir
                                value={nuevoProd.precio === 0 ? '' : nuevoProd.precio}
                                onChange={e => {
                                    const val = parseFloat(e.target.value);
                                    setNuevoProd({...nuevoProd, precio: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label small fw-bold">Stock Inicial</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={nuevoProd.stock === 0 ? '' : nuevoProd.stock}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setNuevoProd({...nuevoProd, stock: isNaN(val) ? 0 : val});
                                }} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="form-label small fw-bold">Descripción</label>
                        <textarea 
                            className="form-control" 
                            rows={3} 
                            value={nuevoProd.descripcion}
                            onChange={e => setNuevoProd({...nuevoProd, descripcion: e.target.value})} 
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Imágenes</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            multiple 
                            accept="image/*" // Solo permite seleccionar imágenes
                            onChange={handleFileChange} 
                            required 
                        />
                        <small className="text-muted">Puedes seleccionar varias fotos a la vez.</small>
                    </div>

                    <div className="botones-modal">
                        <button 
                            type="submit" 
                            className="btn-cerrar" 
                            disabled={cargando}
                        >
                            {cargando ? 'Guardando...' : 'Añadir Producto'}
                        </button>
                        <button 
                            type="button" 
                            className="btn-cambiar" 
                            onClick={onClose} 
                            disabled={cargando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoProducto;