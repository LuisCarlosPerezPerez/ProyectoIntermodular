import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import productoService from '../Services/ProductoServicio';
import { VerProductoDTO } from '../types/Producto';
import Header from './Header';
import Footer from './Footer';
import ModalNuevoProducto from '../componentes/ModalNuevoProducto';
import '../styles/Tienda.css';

const Tienda: React.FC = () => {
    const [productos, setProductos] = useState<VerProductoDTO[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estado para gestionar si estamos editando o creando
    const [productoAEditar, setProductoAEditar] = useState<VerProductoDTO | null>(null);
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('TODOS');
    
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

    // Funciones para gestionar el Modal
    const abrirModalCrear = () => {
        setProductoAEditar(null);
        setIsModalOpen(true);
    };

    const abrirModalEditar = (prod: VerProductoDTO, e: React.MouseEvent) => {
        e.preventDefault(); // Evita que se dispare el Link al editar
        setProductoAEditar(prod);
        setIsModalOpen(true);
    };

    // Función para eliminar
    const eliminarProducto = async (id: number, e: React.MouseEvent) => {
        e.preventDefault(); // Evita que se dispare el Link al eliminar
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await productoService.eliminar(id);
                cargarProductos(); // Refrescar lista
            } catch (error) {
                alert("Error al eliminar el producto");
            }
        }
    };

    const productosFiltrados = categoriaSeleccionada === 'TODOS'
        ? productos
        : productos.filter(prod => prod.categoria === categoriaSeleccionada);

    return (
        <>
            <Header />
            <div className="tienda-page">
                <main className="tienda-container">
                    
                    <div className="tienda-header-actions">
                        <h1>Productos</h1>
                        
                        <div className="tienda-filter-bar">
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
                            <p className="no-productos-mensaje">No hay productos disponibles.</p>
                        </div>
                    ) : (
                        <div className="productos-grid">
                            {productosFiltrados.map((prod) => (
                                <Link 
                                    to={`/producto/${prod.id_producto}`} 
                                    key={prod.id_producto} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="producto-card">
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
                                                
                                                {/* Lógica de botones de Admin */}
                                                {esStaff ? (
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <button className="btn-carrito" onClick={(e) => abrirModalEditar(prod, e)}>✏️</button>
                                                        <button className="btn-carrito" style={{ backgroundColor: '#ce2424' }} onClick={(e) => eliminarProducto(prod.id_producto, e)}>🗑️</button>
                                                    </div>
                                                ) : (
                                                    <button className="btn-carrito">Ver Detalle</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <ModalNuevoProducto 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={cargarProductos} 
                producto={productoAEditar || undefined} // Pasamos el producto al modal
            />

            <Footer />
        </>
    );
};

export default Tienda;