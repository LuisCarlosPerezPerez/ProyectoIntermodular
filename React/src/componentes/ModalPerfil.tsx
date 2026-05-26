import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import ModalPedidos from './ModalPedidos'; 
import '../styles/ModalPerfil.css'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPerfil: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [showPedidos, setShowPedidos] = useState(false);
    
    // Recuperamos la sesión de manera segura
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    const usuarioLogueado = sesionGuardada ? JSON.parse(sesionGuardada) : null;
    const idCliente = usuarioLogueado ? (usuarioLogueado.id || usuarioLogueado.id_cliente || 0) : 0;

    // 🔥 Soporte para cerrar con la tecla Escape (Normativa WCAG)
    useEffect(() => {
        const checkEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', checkEscape);
        return () => window.removeEventListener('keydown', checkEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleCerrarSesion = () => {
        authService.logout();
        localStorage.removeItem('usuario_sesion');
        onClose();
        window.location.href = '/'; 
    };

    const handleCambiarCuenta = () => {
        authService.logout();
        localStorage.removeItem('usuario_sesion');
        onClose();
        window.location.href = '/Autenticacion'; 
    };

    return (
        <>
            {/* 🌟 Corrección WAVE: El overlay ahora responde al clic para cerrar */}
            <div className="overlay" onClick={onClose}> 
                <div 
                    className="modal-contenido" 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="modal-titulo-id"
                    onClick={(e) => e.stopPropagation()} // Evita que se cierre al pinchar dentro
                >
                    {/* 🌟 Corrección WAVE: Botón con contraste nítido y accesible */}
                    <button 
                        className="cerrar-modal text-oscuro-wave" 
                        onClick={onClose}
                        aria-label="Cerrar modal de perfil"
                    >
                        &times;
                    </button>
                    
                    <div className="perfil-info">
                        <img 
                            src="Imagenes/pollo.jpg" 
                            alt="Foto de perfil del usuario" 
                        />
                        {/* 🌟 Corrección WAVE: h1 estructural presente */}
                        <h1 id="modal-titulo-id" className="modal-titulo">Mi Perfil</h1>
                        
                        {/* 🌟 Corrección WAVE: Clase con color oscuro reglamentario sobre fondo blanco */}
                        {usuarioLogueado && (
                            <p className="saludo-usuario text-saludo-wave">
                                ¡Hola, {usuarioLogueado.usuario}!
                            </p>
                        )}
                    </div>

                    <div className="botones-modal">
                        {/* 🌟 Corrección WAVE: Clases específicas para aplicar los colores corregidos del CSS */}
                        <button 
                            onClick={() => setShowPedidos(true)} 
                            className="btn-pedidos btn-ver-pedidos-wave"
                        >
                            Ver mis pedidos
                        </button>
                        <button onClick={handleCerrarSesion} className="btn-cerrar">
                            Cerrar Sesión
                        </button>
                        <button onClick={handleCambiarCuenta} className="btn-cambiar btn-cambiar-cuenta-wave">
                            Cambiar Cuenta
                        </button>
                    </div>
                </div>
            </div>

            <ModalPedidos 
                isOpen={showPedidos} 
                onClose={() => setShowPedidos(false)} 
                idCliente={idCliente} 
            />
        </>
    );
};

export default ModalPerfil;