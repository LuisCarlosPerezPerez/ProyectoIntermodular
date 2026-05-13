import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import productoService from '../Services/ProductoServicio';
import { VerProductoDTO } from '../types/Producto';
import Header from './Header';
import Footer from './Footer';
import ModalNuevoProducto from '../componentes/ModalNuevoProducto'; // Asegúrate de que la ruta sea correcta
import '../styles/Tienda.css';

const Tienda: React.FC = () => {
    const [productos, setProductos] = useState<VerProductoDTO[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
        <>
            <Header />
            <main className="tienda-container">
                <div className="tienda-header-row" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px' 
                }}>
                    <h1>Productos</h1>
                    {/* Botón más vistoso para el Staff */}
                    {esStaff && (
                        <button 
                            className="btn-cambiar" 
                            onClick={() => setIsModalOpen(true)}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            + Añadir Producto
                        </button>
                    )}
                </div>

                <div className="grid-productos">
                    {productos.map((prod) => (
                        <Link 
                            to={`/producto/${prod.id_producto}`} 
                            key={prod.id_producto} 
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="producto">
                                <img 
                                    src={formatearImagen(prod.contenidoImagenes?.[0])} 
                                    alt={prod.nombre} 
                                />
                                <h3>{prod.nombre}</h3>
                                <p>{prod.descripcion}</p>
                                <span className="precio">{prod.precio.toFixed(2)}€</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Invocación del Modal Vistoso */}
            <ModalNuevoProducto 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={cargarProductos} 
            />

            <Footer />
        </>
    );
};

export default Tienda;