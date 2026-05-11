import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import productoService from '../Services/ProductoServicio';
import type { VerProductoDTO } from '../types/Producto';
import '../styles/Inicio.css';

const Inicio = () => {
    // Usamos el DTO de "Ver" que es el que devuelve el método listar()
    const [productos, setProductos] = useState<VerProductoDTO[]>([]);

    useEffect(() => {
        const cargarHome = async () => {
            try {
                const data = await productoService.listar();
                // Solo tomamos los primeros 3 para cumplir con tu regla de diseño
                setProductos(data.slice(0, 3));
            } catch (error) {
                console.error("Error al cargar productos en la Home:", error);
            }
        };

        cargarHome();
    }, []);

    return (
        <div className="inicio-body">
            <Header />

            <div className="hero">
                <img src="Imagenes/pollo.jpg" alt="Ave Principal" className="hero-img" />
                <div className="hero-text">
                    <h1>Bienvenido a Alas de Cristal</h1>
                    <p>
                        Aquí podrás encontrar una gran variedad de aves exóticas, desde un 
                        agapornis hasta un tucán. Tenemos de todo: jaulas, comederos, 
                        bebederos además de todo tipo de comida para ellos.
                    </p>
                </div>
            </div>

            <main>
                <div className="container">
                    {/* SECCIÓN: ¿Quiénes somos? - Siempre visible */}
                    <section className="info-section">
                        <div className="text">
                            <h2>¿Quiénes somos?</h2>
                            <p>Somos una empresa pequeña que se dedica al rescate y la venta de aves exóticas de manera legal.</p>
                        </div>
                        <div className="image">
                            <img src="Imagenes/polloenbaño.jpeg" alt="Pollo en baño" />
                        </div>
                    </section>

                    {/* SECCIÓN DINÁMICA: Más Comprado - Solo si hay productos */}
                    {productos.length > 0 && (
                    <section className="mas-comprado">
                        <h2 style={{ textAlign: 'center' }}>Más Comprado</h2>
                        <div className="comprado-grid">
                            
                            {/* 1. Producto Grande */}
                            <div className="card grande">
                                <img 
                                    /* Usamos la primera imagen del array contenidoImagenes */
                                    src={productos[0].contenidoImagenes?.[0] 
                                        ? `data:image/jpeg;base64,${productos[0].contenidoImagenes[0]}` 
                                        : 'Imagenes/default.jpg'} 
                                    alt={productos[0].nombre} 
                                />
                                <h3>{productos[0].nombre}</h3>
                                <p>{productos[0].descripcion}</p>
                                <span className="precio">{productos[0].precio} €</span>
                            </div>

                            {/* 2. Productos Pequeños */}
                            {productos.slice(1, 3).map((p) => (
                                <div className="card" key={p.id_producto}> {/* Usamos id_producto */}
                                    <img 
                                        src={p.contenidoImagenes?.[0] 
                                            ? `data:image/jpeg;base64,${p.contenidoImagenes[0]}` 
                                            : 'Imagenes/default.jpg'} 
                                        alt={p.nombre} 
                                    />
                                    <h3>{p.nombre}</h3>
                                    <p>{p.descripcion}</p>
                                    <span className="precio">{p.precio} €</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                    {/* SECCIÓN: ¿Qué buscamos? - Siempre visible */}
                    <section className="info-section reverse">
                        <div className="image">
                            <img src="Imagenes/agapornibebe.jpg" alt="Agaporni Bebé" />
                        </div>
                        <div className="text">
                            <h2>¿Qué buscamos?</h2>
                            <p>Buscamos a gente que pueda cuidar de estos amiguitos alados.</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Inicio;