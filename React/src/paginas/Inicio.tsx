import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import productoService from '../Services/ProductoServicio';
import type { VerProductoDTO } from '../types/Producto';
import '../styles/Inicio.css';

const Inicio: React.FC = () => {
   /* const [productos, setProductos] = useState<VerProductoDTO[]>([]);

    useEffect(() => {
        const cargarHome = async () => {
            try {
                const data = await productoService.listar();
                // Tomamos los 3 primeros productos para tu grid
                setProductos(data.slice(0, 3));
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        cargarHome();
    }, []);

    // Función auxiliar para manejar las imágenes Base64
    const getImagen = (producto: VerProductoDTO) => {
        if (producto.contenidoImagenes && producto.contenidoImagenes.length > 0) {
            return `data:image/jpeg;base64,${producto.contenidoImagenes[0]}`;
        }
        return 'Imagenes/default.jpg'; // Imagen por defecto si no hay
    };*/

    return (
        <div className="inicio-body">
            <Header />

            <div className="hero">
                <img src="Imagenes/pollo.jpg" alt="Ave" className="hero-img" />
                <div className="hero-text">
                    <h1>Bienvenido a Alas de Cristal</h1>
                    <p>
                        Aqui podras encontrar una gran variedad de aves exóticas, desde un 
                        agapornis hasta un tucán. Tenemos de todo, tenemos jaulas, comederos, 
                        bebederos ademas de todo tipo de comida para ellos.
                    </p>
                </div>
            </div>

            <main>
                <div className="container">
                    <section className="info-section">
                        <div className="text">
                            <h2>¿Quiénes somos?</h2>
                            <p>Somos una empresa pequeña que se dedica al rescate y la venta de aves exóticas de manera legal.</p>
                        </div>
                        <div className="image">
                            <img src="Imagenes/polloenbaño.jpeg" alt="Pollo en el suelo del baño" />
                        </div>
                    </section>

                    <section className="info-section reverse">
                        <div className="image">
                            <img src="Imagenes/agapornibebe.jpg" alt="Agaporni recien nacido" />
                        </div>
                        <div className="text">
                            <h2>¿Qué buscamos?</h2>
                            <p>Buscamos a gente que pueda cuidar de estos animiguitos alados.</p>
                        </div>
                    </section>
                </div>

               {/*<section className="mas-comprado">
                    <h2>Más Comprado</h2>
                    <div className="comprado-grid">
                        {productos.length > 0 && (
                            <>
                               
                                <div className="card grande">
                                    <Link to={`/DetallesProductos/${productos[0].id_producto}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img src={getImagen(productos[0])} alt={productos[0].nombre} />
                                        <h3>{productos[0].nombre}</h3>
                                        <p>{productos[0].descripcion}</p>
                                        <span className="precio">{productos[0].precio.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</span>
                                    </Link>
                                </div>

                                
                                {productos.slice(1, 3).map((prod) => (
                                    <div className="card" key={prod.id_producto}>
                                        <Link to={`/DetallesProductos/${prod.id_producto}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img src={getImagen(prod)} alt={prod.nombre} />
                                            <h3>{prod.nombre}</h3>
                                            <p>{prod.descripcion}</p>
                                            <span className="precio">{prod.precio.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</span>
                                        </Link>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </section>{*/}
            </main>

            <Footer />
        </div>
    );
};

export default Inicio;