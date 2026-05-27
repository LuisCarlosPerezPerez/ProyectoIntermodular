import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import productoService from '../Services/ProductoServicio';
import type { VerProductoDTO } from '../types/Producto';
import ModalDetalleProducto from './DetalleProducto'; 

// Importamos los estilos de Tienda para heredar exactamente las tarjetas idénticas
import '../styles/Tienda.css';
import '../styles/Inicio.css';

const Inicio: React.FC = () => {
    const [productosTop, setProductosTop] = useState<VerProductoDTO[]>([]);
    const [cargando, setCargando] = useState(true);
    
    // Estados para el control del Modal de Detalles
    const [productoSeleccionado, setProductoSeleccionado] = useState<VerProductoDTO | null>(null);
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false);

    useEffect(() => {
        const cargarTopVentas = async () => {
            try {
                // Llamada al endpoint optimizado de los más vendidos
                const data = await productoService.listarMasVendidos();
                setProductosTop(data || []);
            } catch (error) {
                console.error("Error al cargar el top de ventas:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarTopVentas();
    }, []);

    // Función auxiliar para formatear imágenes (Base64 o URL)
    const formatearImagen = (img: string | undefined) => {
        if (!img) return '/Imagenes/placeholder.jpg';
        if (img.startsWith('http') || img.startsWith('data:image')) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    // Funciones de control del Modal
    const abrirDetalle = (prod: VerProductoDTO) => {
        setProductoSeleccionado(prod);
        setIsModalDetalleOpen(true);
    };

    const cerrarDetalle = () => {
        setProductoSeleccionado(null);
        setIsModalDetalleOpen(false);
    };

    return (
        <div className="inicio-body">
            <Header />

            {/* HERO SECTION */}
            <div className="hero">
                <img src="Imagenes/pollo.jpg" alt="Ave exótica en portada" className="hero-img" />
                <div className="hero-text">
                    <h1>Bienvenido a Alas de Cristal</h1>
                    <p>
                        Aquí podrás encontrar una gran variedad de aves exóticas, desde un 
                        agapornis hasta un tucán. Tenemos de todo, tenemos jaulas, comederos, 
                        bebederos además de todo tipo de comida para ellos.
                    </p>
                    
                    {/* 🌟 CONTENEDOR DE BOTONES */}
                    <div className="hero-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '15px' }}>
                        
                        {/* Botón Catálogo */}
                        <Link to="/Tienda" className="btn-hero" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#00575C',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s'
                        }}>
                            Ver Catálogo Completo
                        </Link>

                        {/* 🌟 NUEVO BOTÓN: Quiénes Somos */}
                        <Link to="/QuienesSomos" className="btn-hero-secondary" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            border: '1px solid #fff',
                            transition: 'all 0.2s'
                        }}>
                            Conócenos / Quiénes Somos
                        </Link>
                        
                    </div>
                </div>
            </div>

            <main className="container my-5">
                <section className="seccion-destacados">
                    <h2 className="titulo-ventas" style={{ textAlign: 'center', marginBottom: '10px' }}>🔥 Los Más Vendidos</h2>
                    <p className="subtitulo-ventas" style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                        Descubre los productos estrella favoritos de nuestros clientes
                    </p>

                    {cargando ? (
                        <div className="loader-inicio" style={{ textAlign: 'center', padding: '40px' }}>
                            Consultando el aviario...
                        </div>
                    ) : productosTop.length > 0 ? (
                        <div className="productos-grid">
                            {productosTop.slice(0, 3).map((prod) => (
                                <div 
                                    className="producto-card" 
                                    key={prod.id_producto}
                                    onClick={() => abrirDetalle(prod)}
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
                                            <button className="btn-ver-detalle">Ver Detalle</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#888' }}>No hay suficientes datos de ventas para mostrar el Top 3.</p>
                    )}
                </section>
            </main>

            {/* MODAL DE DETALLES UNIFICADO */}
            <ModalDetalleProducto 
                isOpen={isModalDetalleOpen}
                onClose={cerrarDetalle}
                producto={productoSeleccionado}
            />

            <Footer />
        </div>
    );
};

export default Inicio;