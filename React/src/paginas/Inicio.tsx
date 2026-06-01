import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import productoService from '../Services/ProductoServicio';
import type { VerProductoDTO } from '../types/Producto';
import ModalDetalleProducto from './DetalleProducto'; 
import '../styles/Tienda.css';
import '../styles/Inicio.css';

const Inicio: React.FC = () => {
    const [productosTop, setProductosTop] = useState<VerProductoDTO[]>([]);
    const [cargando, setCargando] = useState(true);
    const [productoSeleccionado, setProductoSeleccionado] = useState<VerProductoDTO | null>(null);
    const [isModalDetalleOpen, setIsModalDetalleOpen] = useState(false);

    useEffect(() => {
        const cargarTopVentas = async () => {
            try {
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

    const formatearImagen = (img: string | undefined) => {
        if (!img) return '/Imagenes/placeholder.jpg';
        if (img.startsWith('http') || img.startsWith('data:image')) return img;
        return `data:image/jpeg;base64,${img}`;
    };

    const abrirDetalle = (prod: VerProductoDTO) => {
        setProductoSeleccionado(prod);
        setIsModalDetalleOpen(true);
    };

    const cerrarDetalle = () => {
        setProductoSeleccionado(null);
        setIsModalDetalleOpen(false);
    };

    const productosAMostrar = productosTop.slice(0, 3);

    return (
        <div className="inicio-body">
            <Header />
            <div className="hero">
                <img src="Imagenes/tucan.jpg" alt="Ave exótica en portada" className="hero-img" />
                <div className="hero-text">
                    <h1>Bienvenido a Alas de Cristal</h1>
                    <p>
                        Descubre la mayor selección y belleza de aves exóticas, desde agapornis hasta majestuosos tucanes. 
                        Equipamos tu hogar con jaulas premium, comederos avanzados y la alimentación más selecta del mercado.
                    </p>
                    
                    <div className="hero-actions">
                        <Link to="/Tienda" className="hero-cta-btn">
                            Explorar Catálogo
                        </Link>
                        <Link to="/QuienesSomos" className="btn-hero-secondary">
                            Quiénes Somos
                        </Link>
                    </div>
                </div>
            </div>

            <main className="container my-5">
                <div className="banner-confianza-tienda">
                    <div className="item-confianza">
                        Envíos Nacionales Seguros y Garantizados
                    </div>
                    <div className="item-confianza">
                        Pago 100% Protegido y Encriptado
                    </div>
                    <div className="item-confianza">
                        Expertos en Aves y Cuidado Exótico
                    </div>
                </div>

                <section className="seccion-destacados">
                    <h2 className="titulo-ventas">Los Más Vendidos de la Semana</h2>
                    <p className="subtitulo-ventas">
                        Los productos estrella y favoritos recomendados por nuestros criadores.
                    </p>

                    {cargando ? (
                        <div className="loader-inicio">
                            Consultando el aviario...
                        </div>
                    ) : productosAMostrar.length > 0 ? (
                        <div className="grid-mas-vendidos">
                            
                            {productosAMostrar.map((prod, index) => (
                                <div 
                                    className="link-card-producto" 
                                    key={prod.id_producto}
                                    onClick={() => abrirDetalle(prod)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="card-producto-cristal">
                                        {index === 0 && (
                                            <div className="badge-oferta-exotica">TOP VENTAS</div>
                                        )}
                                        
                                        <div className="card-img-wrapper">
                                            <img 
                                                src={formatearImagen(prod.contenidoImagenes?.[0])} 
                                                alt={prod.nombre} 
                                            />
                                        </div>

                                        <div className="card-info-cristal">
                                            <div className="badge-pos">{index + 1}</div>
                                            <h3>{prod.nombre}</h3>
                                            <p className="desc-producto">{prod.descripcion}</p>
                                            
                                            <div className="card-footer-cristal">
                                                <span className="precio-cristal">{prod.precio.toFixed(2)}€</span>
                                            </div>

                                            {prod.stock <= 5 && prod.stock > 0 && (
                                                <span className="aviso-stock-critico">⚠️ ¡Últimas {prod.stock} unidades!</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <p className="subtitulo-ventas">No hay suficientes datos de ventas en este momento.</p>
                    )}
                </section>
            </main>

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