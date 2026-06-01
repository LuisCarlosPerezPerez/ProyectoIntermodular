import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/InformativasSeparadas.css';

const CondicionesEntrega: React.FC = () => {
    return (
        <>
            <Header />
            <div className="cristal-info-page">
                <main className="cristal-info-container">
                    <div className="cristal-info-card">
                        <h1>Condiciones de Entrega</h1>
                        <p className="info-subtitulo">Cómo gestionamos, empaquetamos y enviamos de forma segura cada pedido.</p>
                        
                        <hr className="info-divisor" />

                        <div className="tabla-envios-wrapper">
                            <table className="tabla-envios">
                                <thead>
                                    <tr>
                                        <th>Tipo de Envío</th>
                                        <th>Plazo de Entrega</th>
                                        <th>Costo</th>
                                        <th>Restricciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Estándar Peninsular</strong></td>
                                        <td>24 - 48 horas</td>
                                        <td>4.95€ (Gratis &gt; 50€)</td>
                                        <td>Solo accesorios y comida</td>
                                    </tr>
                                    <tr>
                                        <td><strong>MRW Mascotas (Vivos)</strong></td>
                                        <td>Menos de 14 horas</td>
                                        <td>35.00€ tarifa fija</td>
                                        <td>Obligatorio para aves</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Recogida en Central</strong></td>
                                        <td>Mismo día (Cita previa)</td>
                                        <td>Gratuito</td>
                                        <td>Sin restricciones</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <section className="info-seccion">
                            <h3>Protocolo Especial de Transporte Vivo</h3>
                            <p>
                                El bienestar de nuestros ejemplares es nuestra máxima prioridad absoluta. Las aves se envían 
                                exclusivamente de lunes a jueves a través del servicio preferente de <strong>MRW Mascotas</strong>, 
                                el cual cuenta con vehículos climatizados y con riguroso control biológico. 
                            </p>
                            <p>
                                Por motivos de seguridad animal, <strong>no se realizan envíos de aves en vísperas de festivos 
                                ni durante olas de calor extremo</strong> (temperaturas superiores a los 38°C). En tales casos, el envío 
                                se pospondrá avisando previamente al comprador.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default CondicionesEntrega;