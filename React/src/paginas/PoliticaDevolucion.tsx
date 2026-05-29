import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/InformativasSeparadas.css';

const PoliticaDevolucion: React.FC = () => {
    return (
        <>
            <Header />
            <div className="info-separada-page">
                <main className="info-separada-container">
                    <div className="info-separada-card">
                        <h1>🔄 Política de Cambios y Devoluciones</h1>
                        <p className="info-subtitulo">Términos legales de desistimiento y normativas esenciales de bioseguridad.</p>
                        
                        <hr className="info-divisor" />

                        <section className="info-seccion">
                            <h3>1. Productos Físicos y Accesorios</h3>
                            <p>
                                Dispones de un plazo legal de <strong>14 días naturales</strong> desde la recepción de tu paquete para 
                                solicitar una devolución. El producto debe encontrarse estrictamente en su embalaje original, 
                                completamente precintado y sin ningún tipo de signo de haber sido instalado o introducido en aviarios. 
                                Esto lo hacemos por prevención estricta de contagios cruzados de patógenos (como la psitacosis).
                            </p>
                        </section>

                        <section className="info-seccion">
                            <blockquote className="alerta-bioseguridad">
                                ❌ <strong>Excepción de Seguridad Sanitaria (Ejemplares Vivos):</strong><br />
                                Bajo la estricta normativa vigente de bienestar animal y bioseguridad, los animales vivos 
                                <strong> no están sujetos al derecho de desistimiento ni devolución</strong> una vez han salido de 
                                nuestras instalaciones controladas, salvo que se dictamine y certifique una incidencia veterinaria 
                                oficial en las primeras 24 horas posteriores a la entrega.
                            </blockquote>
                        </section>

                        <section className="info-seccion">
                            <h3>2. ¿Cómo solicitar un reembolso?</h3>
                            <p>
                                Para abrir una incidencia o gestionar una devolución autorizada, ponte en contacto con nuestro equipo 
                                mediante el formulario de la página de Contacto, indicando siempre tu número de pedido y adjuntando 
                                fotografías claras si el embalaje llegó dañado por parte de la empresa de transportes.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default PoliticaDevolucion;