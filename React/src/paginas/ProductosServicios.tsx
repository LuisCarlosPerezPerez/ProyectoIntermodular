import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/InformativasSeparadas.css';

const ProductosServicios: React.FC = () => {
    return (
        <>
            <Header />
            <div className="cristal-info-page">
                <main className="cristal-info-container">
                    <div className="cristal-info-card">
                        <h1>Catálogo de Productos y Servicios</h1>
                        <p className="info-subtitulo">Garantía de calidad biológica y suministros premium para tus aves.</p>
                        
                        <hr className="info-divisor" />

                        <section className="info-seccion">
                            <h3>1. Variedad de Productos Físicos</h3>
                            <p>
                                Todos los artículos disponibles en nuestra tienda (mixturas especializadas, jaulas de cría, 
                                suplementos vitamínicos y juguetes interactivos) cumplen estrictamente con las normativas europeas 
                                de seguridad animal. Trabajamos únicamente con marcas de primer nivel para asegurar que ningún 
                                accesorio contenga plásticos reciclados de baja calidad o pinturas tóxicas que puedan dañar a tus pájaros.
                            </p>
                        </section>

                        <section className="info-seccion">
                            <h3>2. Servicios de Sexaje por ADN</h3>
                            <p>
                                Ofrecemos un servicio profesional de sexaje molecular mediante muestra de pluma o sangre para todo tipo 
                                de psitácidas (Ninfas, Agapornis, Periquitos, Loros, etc.). El proceso se realiza en total colaboración 
                                con laboratorios biológicos certificados. Recibirás un certificado oficial en formato PDF en un plazo 
                                estimado de 5 a 7 días hábiles directamente en tu correo electrónico.
                            </p>
                        </section>

                        <section className="info-seccion">
                            <h3>3. Asesoramiento en Cría y Mutaciones</h3>
                            <p>
                                Disponemos de un servicio de consultas personalizadas online orientadas a la adecuación del entorno de 
                                tus aves, confección de tablas nutricionales específicas según la época del año (muda, cría, descanso) 
                                y control de árboles genealógicos de mutaciones genéticas para criadores amateurs y profesionales.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default ProductosServicios;