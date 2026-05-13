import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productoService from '../Services/ProductoServicio';
import { VerProductoDTO } from '../types/Producto';

import Header from './Header';
import Footer from './Footer';

import '../styles/Detalles.css';

const DetalleProducto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState<VerProductoDTO | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            cargarDetalle(parseInt(id));
        }
    }, [id]);

    const cargarDetalle = async (productoId: number) => {
        try {
            setCargando(true);
            const data = await productoService.obtenerPorId(productoId);
            setProducto(data);
        } catch (err) {
            console.error("Error al obtener el producto:", err);
            setError("No se pudo cargar la información del producto.");
        } finally {
            setCargando(false);
        }
    };

    // Función para procesar cada imagen del array de Base64
    const formatearImagen = (base64String: string) => {
        if (!base64String) return '/Imagenes/placeholder.jpg';
        return base64String.startsWith('http') ? base64String : `data:image/jpeg;base64,${base64String}`;
    };

    if (cargando) return <div className="loader">Cargando detalles...</div>;
    if (error || !producto) return <div className="alert alert-danger">{error || "Producto no encontrado"}</div>;

    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row">
                    {/* Columna del Carrusel de Imágenes */}
                    <div className="col-md-6">
                        <div id="carouselProducto" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {producto.contenidoImagenes && producto.contenidoImagenes.length > 0 ? (
                                    producto.contenidoImagenes.map((img, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img 
                                                src={formatearImagen(img)} 
                                                className="d-block w-100" 
                                                alt={`Vista ${index + 1} de ${producto.nombre}`} 
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="carousel-item active">
                                        <img src="/Imagenes/placeholder.jpg" className="d-block w-100" alt="Sin imagen" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Controles si hay más de una imagen */}
                            {producto.contenidoImagenes && producto.contenidoImagenes.length > 1 && (
                                <>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselProducto" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Anterior</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselProducto" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Siguiente</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Columna de Información */}
                    <div className="col-md-6 ps-md-5">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><span onClick={() => navigate('/Tienda')} style={{cursor:'pointer', color:'#00bcd4'}}>Tienda</span></li>
                                <li className="breadcrumb-item active">{producto.nombre}</li>
                            </ol>
                        </nav>
                        
                        <h1 className="fw-bold">{producto.nombre}</h1>
                        <h3 className="fw-bold text-primary">{producto.precio.toFixed(2)}€</h3>
                        
                        <div className="my-4">
                            <h5>Descripción</h5>
                            <p className="text-muted">{producto.descripcion}</p>
                        </div>

                        <div className="mb-4">
                            <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Agotado'}
                            </span>
                        </div>

                        <button className="btn btn-comprar btn-lg w-100" disabled={producto.stock <= 0}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetalleProducto;