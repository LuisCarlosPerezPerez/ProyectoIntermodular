import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/InformativasSeparadas.css';

const DeclaracionAccesibilidad: React.FC = () => {
    return (
        <>
            <Header />
            <div className="cristal-info-page">
                <main className="cristal-info-container">
                    <div className="cristal-info-card">
                        <h1>Declaración de Accesibilidad</h1>
                        <p className="info-subtitulo">Nuestro compromiso para que todos los apasionados de la avicultura puedan navegar sin barreras.</p>
                        
                        <hr className="info-divisor" />

                        <section className="info-seccion">
                            <h3>1. Compromiso con la accesibilidad</h3>
                            <p>
                                Nos hemos comprometido a hacer accesible nuestro sitio web de conformidad con las normativas estándar de 
                                accesibilidad web. Trabajamos continuamente aplicando las pautas de accesibilidad para el contenido web 
                                <strong> WCAG 2.1</strong> en su nivel AA, con el objetivo de garantizar una experiencia de usuario inclusiva.
                            </p>
                        </section>

                        <section className="info-seccion">
                            <h3>2. Características de accesibilidad implementadas</h3>
                            <p>
                                Para facilitar la navegación de personas con diversidad funcional o limitaciones técnicas, esta plataforma incorpora:
                            </p>
                            <p>
                                • <strong>Estructura clara de encabezados:</strong> Respetamos escrupulosamente las etiquetas jerárquicas para que los lectores de pantalla lean el contenido de forma lógica.<br />
                                • <strong>Textos alternativos (Alt):</strong> Todas las imágenes de nuestros productos y accesorios de aves cuentan con descripciones textuales alternativas.<br />
                                • <strong>Contraste de colores adecuado:</strong> Los textos mantienen una relación de contraste óptima sobre nuestros fondos oscuros, facilitando la lectura para personas con fatiga visual o baja visión.<br />
                                • <strong>Navegación por teclado:</strong> Todos los enlaces, desplegables de categorías y modales de producto pueden operarse utilizando el tabulador.
                            </p>
                        </section>

                        <section className="info-seccion">
                            <h3>3. Contacto y sugerencias</h3>
                            <p>
                                Si experimentas cualquier tipo de dificultad técnica para acceder a algún apartado de la tienda, visualizar los stock, 
                                o si detectas que algún elemento no cumple plenamente con los criterios de accesibilidad, por favor háznoslo saber. 
                                Puedes escribirnos rellenando el formulario de nuestra sección de <strong>Contacto</strong> para que podamos corregirlo 
                                con la máxima prioridad.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default DeclaracionAccesibilidad;