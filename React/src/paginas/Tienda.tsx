import React, { useEffect, useState } from 'react';
import { authService } from '../Services/authServicio';
import productoService from '../Services/ProductoServicio';
import { usePedido } from './PedidoContext'; 
import { VerProductoDTO } from '../types/Producto';
import Header from './Header';
import Footer from './Footer';
import ModalNuevoProducto from '../componentes/ModalNuevoProducto';
import ModalEditarProducto from '../componentes/ModalEditarProducto'; 
import ModalDetalleProducto from './DetalleProducto'; 
import '../styles/Tienda.css';

const Tienda: React.FC = () => {
    const [productos, setProductos] = useState<VerProductoDTO[]>([]);
    const { carritoItems, agregarProducto } = usePedido(); 
    const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState<VerProductoDTO | null>(null);
    const [productoSeleccionado, setProductoSeleccionado] = useState<VerProductoDTO | null>(null);
    const [isVistaRapidaOpen, setIsVistaRapidaOpen] = useState(false); 
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('TODOS');
    const [textoBusqueda, setTextoBusqueda] = useState<string>('');
    const esStaff = authService.esStaff();

    useEffect(() => { 
        cargarProductos(); 
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await productoService.obtenerTodos();
            setProductos(data || []);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    const formatearImagen = (img: string | undefined) => {
        if (!img) return '/Imagenes/placeholder.jpg';
        if (img.startsWith('http') || img.startsWith('data:image')) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    const abrirModalCrear = () => {
        setIsCrearModalOpen(true);
    };

    const abrirModalEditar = (prod: VerProductoDTO, e: React.MouseEvent) => {
        e.stopPropagation(); 
        setProductoAEditar(prod);
        setIsEditarModalOpen(true); 
    };

    const eliminarProducto = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await productoService.eliminar(id);
                cargarProductos(); 
            } catch (error) {
                alert("Error al eliminar el producto");
            }
        }
    };

    const abrirVistaRapida = (prod: VerProductoDTO) => {
        setProductoSeleccionado(prod);
        setIsVistaRapidaOpen(true);
    };

    const productosFiltrados = productos.filter(prod => {
        const pasaCategoria = categoriaSeleccionada === 'TODOS' || prod.categoria === categoriaSeleccionada;
        const pasaBusqueda = prod.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
                             prod.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase());
        
        return pasaCategoria && pasaBusqueda;
    });

    return (
        <>
            <Header />
            <div className="tienda-page">
                <main className="tienda-container">
                    
                    <div className="tienda-header-actions">
                        <h1>Nuestra Tienda</h1>
                        
                        <div className="tienda-filter-bar">
                            <div className="tienda-search-wrapper" style={{ display: 'inline-block', marginRight: '15px' }}>
                                <input
                                    type="text"
                                    className="tienda-input-search"
                                    placeholder="🔍 Buscar producto..."
                                    aria-label="Buscar productos en el catálogo" 
                                    value={textoBusqueda}
                                    onChange={(e) => setTextoBusqueda(e.target.value)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <label htmlFor="filtro-categoria">Filtrar por:</label>
                            <select 
                                id="filtro-categoria"
                                className="tienda-select"
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            >
                                <option value="TODOS">Ver Todo el Catálogo</option>
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

                        {esStaff && (
                            <button className="btn-añadir-producto" onClick={abrirModalCrear}>
                                + Añadir Producto
                            </button>
                        )}
                    </div>

                    {productosFiltrados.length === 0 ? (
                        <div className="no-productos-contenedor">
                            <p className="no-productos-mensaje">No se encontraron productos que coincidan con los filtros aplicados.</p>
                        </div>
                    ) : (
                        <div className="productos-grid">
                            {productosFiltrados.map((prod) => (
                                <div 
                                    className="producto-card" 
                                    key={prod.id_producto}
                                    onClick={() => abrirVistaRapida(prod)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="producto-imagen-wrapper">
                                        <img 
                                            className="producto-imagen"
                                            src={formatearImagen(prod.contenidoImagenes?.[0])} 
                                            alt={prod.nombre} 
                                        />
                                    </div>
                                    <div className="producto-info">
                                        <h3 className="producto-nombre">{prod.nombre}</h3>
                                        <p className="producto-descripcion">{prod.descripcion}</p>
                                        
                                        <div className="producto-footer">
                                            <span className="producto-precio">{prod.precio.toFixed(2)}€</span>
                                            
                                            {esStaff ? (
                                                <div className="admin-actions-buttons" onClick={(e) => e.stopPropagation()}>
                                                    <button className="btn-admin-edit" onClick={(e) => abrirModalEditar(prod, e)}>✏️</button>
                                                    <button className="btn-admin-delete" onClick={(e) => eliminarProducto(prod.id_producto, e)}>🗑️</button>
                                                </div>
                                            ) : (
                                                <button className="btn-ver-detalle">Ver Detalle</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>


            <ModalNuevoProducto 
                isOpen={isCrearModalOpen} 
                onClose={() => setIsCrearModalOpen(false)} 
                onSuccess={cargarProductos} 
            />

            <ModalEditarProducto 
                isOpen={isEditarModalOpen}
                onClose={() => {
                    setIsEditarModalOpen(false);
                    setProductoAEditar(null);
                }}
                onSuccess={cargarProductos}
                producto={productoAEditar}
            />

            <ModalDetalleProducto 
                isOpen={isVistaRapidaOpen}
                onClose={() => setIsVistaRapidaOpen(false)}
                producto={productoSeleccionado}
            />

            <Footer />
        </>
    );
};

export default Tienda;