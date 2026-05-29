import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/Contacto.css';

const Contacto: React.FC = () => {
    const [formulario, setFormulario] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Datos de contacto enviados:", formulario);
        alert(`¡Gracias por escribirnos, ${formulario.nombre}! Responderemos a tu consulta lo antes posible. 🦜`);
        

        setFormulario({ nombre: '', email: '', asunto: '', mensaje: '' });
    };

    return (
        <>
            <Header />
            <div className="contacto-page">
                <main className="contacto-container">
                    

                    <div className="contacto-header">
                        <h1>Contacta con Nosotros</h1>
                        <p>¿Tienes dudas sobre el stock de ninfas, alimentación o el estado de tu pedido? ¡Estamos aquí para ayudarte!</p>
                    </div>

                    <div className="contacto-layout">
                        

                        <section className="contacto-info-sidebar">
                            <div className="info-card">
                                <h3>📞 Teléfono y WhatsApp</h3>
                                <p>+34 644 865 059</p>
                                <span className="info-subtext">Lunes a Viernes de 9:00 a 18:00</span>
                            </div>

                            <div className="info-card">
                                <h3>✉️ Correo Electrónico</h3>
                                <p>info@alasdecristal.com</p>
                                <span className="info-subtext">Respondemos en menos de 24h laborables</span>
                            </div>

                            <div className="info-card">
                                <h3>📍 Punto de Recogida Central</h3>
                                <p>Avenida 1º de Julio, Nº 24</p>
                                <p>13300, Ciudad Real, España</p>
                            </div>

                            <div className="info-card avviso-bienestar">
                                <p>⚠️ <strong>Nota sobre Criadero:</strong> Las visitas para ver las aves disponibles se realizan exclusivamente bajo cita previa confirmada por correo.</p>
                            </div>
                        </section>

                        {/* Bloque Derecho: Formulario de Contacto */}
                        <section className="contacto-formulario-wrapper">
                            <form onSubmit={handleSubmit} className="contacto-form">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="nombre"
                                        required 
                                        value={formulario.nombre}
                                        onChange={handleChange}
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        required 
                                        value={formulario.email}
                                        onChange={handleChange}
                                        placeholder="juan@correo.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="asunto">¿En qué podemos ayudarte?</label>
                                    <select 
                                        id="asunto" 
                                        name="asunto"
                                        required
                                        value={formulario.asunto}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona una opción...</option>
                                        <option value="Pedido">Estado de mi Pedido 📦</option>
                                        <option value="Duda Aves">Consulta sobre Ninfas/Agapornis 🦜</option>
                                        <option value="Alimentacion">Duda sobre Comida o Accesorios 🌾</option>
                                        <option value="Soporte">Problema con la cuenta o Web 💻</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje">Tu Mensaje</label>
                                    <textarea 
                                        id="mensaje" 
                                        name="mensaje"
                                        rows={6}
                                        required 
                                        value={formulario.mensaje}
                                        onChange={handleChange}
                                        placeholder="Escribe detalladamente tu consulta aquí..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-enviar-contacto">
                                    Enviar Mensaje 🦜
                                </button>
                            </form>
                        </section>

                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Contacto;