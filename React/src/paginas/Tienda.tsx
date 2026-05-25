import React, { useEffect, useState } from 'react';
import { authService } from '../Services/authServicio';
import productoService from '../Services/ProductoServicio';
import { usePedido } from './PedidoContext'; // 👈 1. IMPORTAMOS EL HOOK DEL CONTEXTO
import { VerProductoDTO } from '../types/Producto';
import Header from './Header';
import Footer from './Footer';
import ModalNuevoProducto from '../componentes/ModalNuevoProducto';
import ModalEditarProducto from '../componentes/ModalEditarProducto'; 
import '../styles/Tienda.css';

const Tienda: React.FC = () => {
    const [productos, setProductos] = useState<VerProductoDTO[]>([]);
    
    // Consumimos las propiedades necesarias del Contexto Global
    const { carritoItems, agregarProducto } = usePedido(); // 👈 2. EXTRAEMOS LOS MÉTODOS EN MEMORIA
    
    // Control de Modales de Administración (Separados)
    const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState<VerProductoDTO | null>(null);
    
    // Control del Modal de Vista Rápida para Clientes
    const [productoSeleccionado, setProductoSeleccionado] = useState<VerProductoDTO | null>(null);
    const [isVistaRapidaOpen, setIsVistaRapidaOpen] = useState(false);
    
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

    // Funciones del Administrator
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

    // Función del Cliente
    const abrirVistaRapida = (prod: VerProductoDTO) => {
        setProductoSeleccionado(prod);
        setIsVistaRapidaOpen(true);
    };

    // ==========================================================================
    // 🛒 FUNCIÓN DEL CARRITO TOTALMENTE ADAPTADA AL CONTEXTO (CORREGIDA)
    // ==========================================================================
    const añadirAlCarrito = (prod: VerProductoDTO) => {
        // Buscamos si el artículo ya se encuentra dentro de nuestro carrito en memoria
        const itemExistente = carritoItems.find((item) => item.id_producto === prod.id_producto);

        if (itemExistente) {
            if (itemExistente.cantidad >= prod.stock) {
                alert(`Lo sentimos, no puedes añadir más unidades. El stock máximo es de ${prod.stock} u.`);
                return;
            }
        }

        // Enviamos el producto al estado reactivo global
        agregarProducto({
            id_producto: prod.id_producto,
            nombre: prod.nombre,
            precio: prod.precio,
            stock: prod.stock,
            cantidad: 1, // El contexto se encargará de sumarlo si ya existe
            imagen: prod.contenidoImagenes?.[0]
        });

        alert(`¡${prod.nombre} se ha añadido correctamente a la cesta! 🦜`);
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
                        <h1>Nuestra Tienda</h1>
                        
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
                            <p className="no-productos-mensaje">No hay productos disponibles en esta categoría.</p>
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

            {/* ================= MODAL ADMIN: CREAR ================= */}
            <ModalNuevoProducto 
                isOpen={isCrearModalOpen} 
                onClose={() => setIsCrearModalOpen(false)} 
                onSuccess={cargarProductos} 
            />

            {/* ================= MODAL ADMIN: EDICIÓN ================= */}
            <ModalEditarProducto 
                isOpen={isEditarModalOpen}
                onClose={() => {
                    setIsEditarModalOpen(false);
                    setProductoAEditar(null);
                }}
                onSuccess={cargarProductos}
                producto={productoAEditar}
            />

            {/* ================= MODAL CLIENTE: VISTA RÁPIDA ================= */}
            {isVistaRapidaOpen && productoSeleccionado && (
                <div className="modal-overlay-cliente" onClick={() => setIsVistaRapidaOpen(false)}>
                    <div className="modal-content-cliente" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-top" onClick={() => setIsVistaRapidaOpen(false)}>×</button>
                        
                        <div className="vista-rapida-layout">
                            <div className="vista-rapida-img-container">
                                <img 
                                    src={formatearImagen(productoSeleccionado.contenidoImagenes?.[0])} 
                                    alt={productoSeleccionado.nombre} 
                                />
                            </div>
                            
                            <div className="vista-rapida-detalles">
                                <span className="categoria-tag">{productoSeleccionado.categoria}</span>
                                <h2 className="detalles-titulo">{productoSeleccionado.nombre}</h2>
                                <p className="detalles-precio">{productoSeleccionado.precio.toFixed(2)} €</p>
                                <div className="detalles-divisor"></div>
                                
                                <p className="detalles-descripcion">{productoSeleccionado.descripcion}</p>
                                
                                <div className="detalles-stock-info">
                                    Stock disponible: <strong>{productoSeleccionado.stock} u.</strong>
                                </div>

                                <div className="vista-rapida-acciones">
                                    <button 
                                        className="btn-añadir-carrito-modal"
                                        onClick={() => {
                                            añadirAlCarrito(productoSeleccionado);
                                            setIsVistaRapidaOpen(false);
                                        }}
                                        disabled={productoSeleccionado.stock <= 0}
                                    >
                                        {productoSeleccionado.stock > 0 ? '🛒 Añadir al Carrito' : 'Sin Stock'}
                                    </button>
                                    <button className="btn-salir-modal" onClick={() => setIsVistaRapidaOpen(false)}>
                                        Volver a la tienda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Tienda;