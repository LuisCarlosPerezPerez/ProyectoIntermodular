import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../Services/authServicio'; 
import ModalPerfil from '../componentes/ModalPerfil'; 
import "../styles/Header.css";

const Header: React.FC = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false); 

    const estaLogueado = authService.isLogged();
    const esStaff = authService.esStaff(); 
    const esAdmin = authService.esAdmin(); 

    return (
        <div className="inicio-page">
            <header className="main-header">
                <div className="logo-container">
                    <Link to="/" onClick={() => setMenuAbierto(false)}>
                        <img id="logo" src="Imagenes/Alas_de_Cristal.png" alt="Alas de Cristal" />
                    </Link>
                </div>

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

                    <Link to="/Tienda" onClick={() => setMenuAbierto(false)}>Tienda</Link>
                    <Link to="/QuienesSomos" onClick={() => setMenuAbierto(false)}>Quiénes somos</Link>

                    {estaLogueado && !esStaff && (
                        <Link to="/Carrito" onClick={() => setMenuAbierto(false)}>
                            🛒 Carrito
                        </Link>
                    )}
                    
                    <Link to="/Contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>

                    {estaLogueado && esStaff && (
                        <>
                            <Link to="/Pedidos" onClick={() => setMenuAbierto(false)}>Pedidos</Link>
                            <Link to="/Fichar" onClick={() => setMenuAbierto(false)}>Fichar</Link>
                        </>
                    )}

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