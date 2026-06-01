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
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    const usuarioLogueado = sesionGuardada ? JSON.parse(sesionGuardada) : null;
    const idCliente = usuarioLogueado ? (usuarioLogueado.id || usuarioLogueado.id_cliente || 0) : 0;

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
            <div className="perfil-cristal-overlay" onClick={onClose}> 
                <div 
                    className="perfil-cristal-box" 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="perfil-modal-titulo"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <button 
                        className="perfil-cristal-close-x" 
                        onClick={onClose}
                        aria-label="Cerrar modal de perfil"
                    >
                        &times;
                    </button>

                    <div className="perfil-cristal-info">
                        <div className="perfil-cristal-avatar-wrapper">
                            <img 
                                src="Imagenes/pollo.jpg" 
                                alt="Foto de perfil del usuario" 
                                className="perfil-cristal-avatar"
                            />
                        </div>
                        <h1 id="perfil-modal-titulo" className="perfil-cristal-titulo">Mi Perfil</h1>
                        
                        {usuarioLogueado && (
                            <p className="perfil-cristal-saludo">
                                ¡Hola, <span className="usuario-destacado">{usuarioLogueado.usuario}</span>!
                            </p>
                        )}
                    </div>

                    <div className="perfil-cristal-actions">
                        <button 
                            onClick={() => setShowPedidos(true)} 
                            className="btn-perfil-pedidos"
                        >
                            📦 Ver mis pedidos
                        </button>
                        <button 
                            onClick={handleCerrarSesion} 
                            className="btn-perfil-cerrar"
                        >
                            Cerrar Sesión
                        </button>
                        <button 
                            onClick={handleCambiarCuenta} 
                            className="btn-perfil-cambiar"
                        >
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