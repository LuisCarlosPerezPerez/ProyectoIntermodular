import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../Services/authServicio'; 
import ModalPerfil from '../componentes/ModalPerfil'; 
import "../styles/Header.css";

const Header: React.FC = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar el menú hamburguesa en móviles

    const estaLogueado = authService.isLogged();
    const esStaff = authService.esStaff(); // true si es empleado o admin
    const esAdmin = authService.esAdmin(); // true solo si es administrador

    return (
        <div className="inicio-page">
            <header className="main-header">
                <div className="logo-container">
                    <Link to="/" onClick={() => setMenuAbierto(false)}>
                        <img id="logo" src="Imagenes/LogoAlas.png" alt="Alas de Cristal" />
                    </Link>
                </div>

                {/* Botón hamburguesa visible solo en pantallas móviles */}
                <button 
                    className={`menu-hamburger ${menuAbierto ? 'abierto' : ''}`} 
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú de navegación"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${menuAbierto ? 'active' : ''}`}>
                    {/* Enlaces públicos */}
                    <Link to="/Tienda" onClick={() => setMenuAbierto(false)}>Tienda</Link>
                    
                    {/* El Carrito SOLO se muestra si NO es empleado ni admin */}
                    {!esStaff && (
                        <Link to="/Carrito" onClick={() => setMenuAbierto(false)}>Carrito</Link>
                    )}
                    
                    <Link to="/Contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
                    
                    {/* VISTAS DE EMPLEADO / STAFF */}
                    {estaLogueado && esStaff && (
                        <>
                            <Link to="/Pedidos" onClick={() => setMenuAbierto(false)}>Pedidos</Link>
                            <Link to="/Fichar" onClick={() => setMenuAbierto(false)}>Fichar</Link>
                        </>
                    )}

                    {/* VISTAS EXCLUSIVAS DE ADMINISTRADOR */}
                    {estaLogueado && esAdmin && (
                        <>
                            <Link to="/AdministrarEmpleados" onClick={() => setMenuAbierto(false)}>
                                Staff
                            </Link>
                            <Link to="/Fichados" onClick={() => setMenuAbierto(false)}>
                                Ver Fichados
                            </Link>
                        </>
                    )}

                    {estaLogueado ? (
                        <div 
                            className="perfil-nav" 
                            onClick={() => { setMostrarModal(true); setMenuAbierto(false); }}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <img src="Imagenes/pollo.jpg" alt="Perfil" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                        </div>
                    ) : (
                        <Link to="/Autenticacion" id="botonSesion" onClick={() => setMenuAbierto(false)}>
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>
            </header>

            <ModalPerfil 
                isOpen={mostrarModal} 
                onClose={() => setMostrarModal(false)} 
            />
        </div>
    );
};

export default Header;