import React, { useState } from 'react';
import productoService from '../Services/ProductoServicio';
import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';
import "../styles/ModalNuevoProducto.css"
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    producto?: VerProductoDTO;
}

const ModalNuevoProducto: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    // Estado para controlar el bloqueo del botón mientras se guarda
    const [cargando, setCargando] = useState(false);
    
    // CORREGIDO: Añadido el campo 'categoria' con su valor inicial vacío
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
        
        // Validación manual extra por si no eligen categoría
        if (!nuevoProd.categoria) {
            alert("Por favor, selecciona una categoría para el producto.");
            return;
        }

        setCargando(true); // Deshabilitar botones para evitar envíos duplicados
        
        try {
            await productoService.crear(nuevoProd);
            onSuccess(); // Refrescar la lista de la tienda
            onClose();   // Cerrar el modal
            // CORREGIDO: Limpiar el formulario reiniciando también la categoría
            setNuevoProd({ nombre: '', stock: 0, descripcion: '', categoria: '', precio: 0, contenidoImagenes: [] });
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

                    {/* NUEVO CAMPO: Desplegable para la categoría */}
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Categoría</label>
                        <select 
                            className="form-select"
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
                    <div className="row mb-2">
                        <div className="col-6">
                            <label className="form-label small fw-bold">Precio (€)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                className="form-control" 
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
                            accept="image/*" 
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