import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio'; // Asegúrate de tener este servicio
import ModalPerfil from '../componentes/ModalPerfil'; // El componente que creamos antes
import "../styles/Header.css";

const Header: React.FC = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();

    // Comprobamos si hay una sesión activa
    const estaLogueado = authService.isLogged();

    return (
        <div className="inicio-page">
            <header>
                <div>
                    <Link to="/">
                        <img id="logo" src="Imagenes/LogoAlas.png" alt="Alas de Cristal" />
                    </Link>
                </div>
                <nav>
                    <Link to="/Tienda">Tienda</Link>
                    <Link to="/Carrito">Carrito</Link>
                    
                    {estaLogueado ? (
                        /* SI ESTÁ LOGUEADO: Muestra el avatar que abre el modal */
                        <div 
                            className="perfil-nav" 
                            onClick={() => setMostrarModal(true)}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <img src="Imagenes/pollo.jpg" alt="Perfil" style={{ width: '35px', height: '35px' }} />
                            <span></span>
                        </div>
                    ) : (
                        /* SI NO ESTÁ LOGUEADO: Enlace normal a Autenticación */
                        <Link to="/Autenticacion" id="botonSesion">
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>
            </header>

            {/* Renderizamos el modal y le pasamos el estado y la función para cerrar */}
            <ModalPerfil 
                isOpen={mostrarModal} 
                onClose={() => setMostrarModal(false)} 
            />
        </div>
    );
};

export default Header;