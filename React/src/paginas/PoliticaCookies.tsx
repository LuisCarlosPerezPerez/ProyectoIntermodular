import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/InformativasSeparadas.css';

const PoliticaCookies: React.FC = () => {
    return (
        <>
            <Header />
            <div className="cristal-info-page">
                <main className="cristal-info-container">
                    <div className="cristal-info-card">
                        <h1>Política de Cookies</h1>
                        <p className="info-subtitulo">Información clara y transparente sobre cómo garantizamos tu privacidad y mejoramos tu experiencia.</p>
                        
                        <hr className="info-divisor" />

                        <section className="info-seccion">
                            <h3>1. ¿Qué es una Cookie?</h3>
                            <p>
                                Una cookie es un pequeño archivo de texto que se almacena en tu navegador cuando visitas casi cualquier página web. 
                                Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página, permitiendo guardar 
                                tus preferencias o gestionar tu cesta de la compra sin perder los productos seleccionados.
                            </p>
                        </section>

                        <div className="tabla-envios-wrapper">
                            <table className="tabla-envios">
                                <thead>
                                    <tr>
                                        <th>Tipo de Cookie</th>
                                        <th>Finalidad</th>
                                        <th>Duración</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Técnicas (Necesarias)</strong></td>
                                        <td>Permiten recordar los productos del carrito y mantener tu sesión de usuario iniciada de forma segura.</td>
                                        <td>Sesión</td>
                                    </tr>
                                    <tr>
                                        <td><strong>De Personalización</strong></td>
                                        <td>Recuerdan tus filtros preferidos en el catálogo de la tienda (ej. ver solo comida de Ninfas).</td>
                                        <td>Persistente</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Analíticas (Google)</strong></td>
                                        <td>Nos ayudan a saber cuántas visitas recibimos y qué productos son los más buscados por los amantes de las aves.</td>
                                        <td>Anual</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <section className="info-seccion">
                            <h3>2. Cómo desactivar o eliminar las cookies</h3>
                            <p>
                                En cualquier momento puedes ejercer tu derecho de desactivación o eliminación de cookies de este sitio web. 
                                Estas acciones se realizan de forma diferente en función del navegador que estés usando:
                            </p>
                            <p>
                                Desde la configuración de tu navegador (Chrome, Firefox, Safari o Edge) puedes bloquear el uso de cookies de terceros 
                                o borrar el historial de navegación para limpiar por completo los rastreadores almacenados en tu dispositivo.
                            </p>
                        </section>

                        <section className="info-seccion">
                            <blockquote className="alerta-bioseguridad" style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', borderLeft: '4px solid #38bdf8', color: '#64748b' }}>
                                <strong>Nota importante de navegación:</strong><br />
                                Si decides bloquear las cookies técnicas y estrictamente necesarias, es muy probable que no puedas añadir productos 
                                a tu carrito de la compra ni procesar tus pedidos de forma correcta en nuestra plataforma.
                            </blockquote>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default PoliticaCookies;