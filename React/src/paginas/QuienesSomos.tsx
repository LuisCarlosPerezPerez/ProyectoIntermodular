import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/QuienesSomos.css';

const QuienesSomos: React.FC = () => {
    return (
        <div className="quienes-body">
            <Header />
            <div className="quienes-hero">
                <div className="quienes-hero-text">
                    <h1>Nuestra Historia</h1>
                    <p>Conoce a las personas y la pasión detrás de Alas de Cristal</p>
                </div>
            </div>

            <main className="quienes-container">
                <section className="quienes-intro">
                    <div className="quienes-intro-content">
                        <h2>¿Quiénes Somos?</h2>
                        <p>
                            Somos una pequeña tienda nacida del amor incondicional hacia la naturaleza 
                            y, en especial, hacia nuestros amiguitos alados. Lo que empezó como un pequeño 
                            refugio familiar se ha convertido hoy en un espacio dedicado exclusivamente al 
                            bienestar, cuidado y admiración de las aves exóticas.
                        </p>
                        <p>
                            Creemos firmemente que cada ave tiene una personalidad única y merece un hogar 
                            donde pueda desplegar sus alas con total felicidad y seguridad.
                        </p>
                    </div>
                </section>

                <section className="quienes-pilares">
                    <div className="pilar-card">
                        <div className="pilar-icon">🥚</div>
                        <h3>Cría Responsable</h3>
                        <p>
                            Nos dedicamos a la cría de manera completamente legal, ética y controlada. 
                            Nos aseguramos de que cada polluelo crezca en un ambiente óptimo, con una 
                            alimentación premium y un seguimiento veterinario exhaustivo desde el primer día.
                        </p>
                    </div>

                    <div className="pilar-card destacado">
                        <div className="pilar-icon">❤️</div>
                        <h3>Rescate y Rehabilitación</h3>
                        <p>
                            No solo criamos, también rescatamos. Nos encargamos de dar una segunda oportunidad 
                            a aves que han pasado por situaciones difíciles o abandonos. Las rehabilitamos con paciencia 
                            y amor hasta encontrar a la familia ideal que pueda darles el cuidado que merecen.
                        </p>
                    </div>
                </section>

                <section className="quienes-compromiso">
                    <div className="compromiso-bloque">
                        <h2>Nuestro Compromiso Colectivo</h2>
                        <p>
                            "No vendemos mascotas; ayudamos a conectar almas humanas con compañeros alados, 
                            garantizando que todo el proceso sea transparente, legal y, ante todo, enfocado 
                            en la salud del animal."
                        </p>
                        <Link to="/Tienda" className="btn-visitar">Visitar la Tienda</Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QuienesSomos;