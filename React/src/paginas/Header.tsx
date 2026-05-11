import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Importamos tu CSS exacto

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    
    // Obtenemos el usuario del localStorage (simulando tu js/Usuario.js)
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    const cerrarSesion = () => {
        localStorage.clear();
        window.location.href = "/"; // O usar useNavigate()
    };

    return (
        <>
            <header>
                <div>Alas de Cristal</div>
                <nav>
                    <Link to="/Tienda">Tienda</Link>
                    <Link to="/Carrito">Carrito</Link>
                    
                    {usuario ? (
                        <div className="perfil-nav" onClick={() => setShowModal(true)}>
                            <img src="Imagenes/pollo.jpg" alt="Usuario" />
                            <span>{usuario.nombre}</span>
                        </div>
                    ) : (
                        <Link id="botonSesion" to="/Login" style={{ background: 'black', padding: '5px 10px', borderRadius: '5px' }}>
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>
            </header>

            {/* Modal de Perfil (usando tu HTML de modal anterior) */}
            {showModal && (
                <div className="overlay" style={{ display: 'block' }}>
                    <div className="modal-contenido">
                        <span className="cerrar-modal" onClick={() => setShowModal(false)}>&times;</span>
                        <div className="perfil-info">
                            <img src="Imagenes/pollo.jpg" width="50px" height="50px" alt="Usuario" />
                            <h2>{usuario?.nombre || 'Usuario'}</h2>
                        </div>
                        <div className="botones-modal">
                            <button onClick={cerrarSesion} className="btn-cerrar">Cerrar Sesión</button>
                            <button onClick={() => setShowModal(false)} className="btn-cambiar">Volver</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;