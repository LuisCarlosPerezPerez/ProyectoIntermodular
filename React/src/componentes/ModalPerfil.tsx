import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPerfil: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // Si el estado es falso, no renderizamos nada
    if (!isOpen) return null;

    // Función para Cerrar Sesión: Limpia y recarga la página actual
    const handleCerrarSesion = () => {
        authService.logout(); 
        onClose();
        // Recargamos para que el Header actualice el estado de usuario inmediatamente
        window.location.reload(); 
    };

    // Función para Cambiar Cuenta: Limpia y redirige al login
    const handleCambiarCuenta = () => {
        authService.logout();
        onClose();
        navigate('/Autenticacion'); 
    };

    return (
        /* Usamos la clase .overlay de tu CSS (React la mostrará porque isOpen es true) */
        <div className="overlay" style={{ display: 'flex' }}> 
            <div className="modal-contenido">
                <span className="cerrar-modal" onClick={onClose}>&times;</span>
                
                <div className="perfil-info">
                    {/* Imagen del pollo de image_47d6b1.png */}
                    <img 
                        src="Imagenes/pollo.jpg" 
                        style={{ width: '80px', height: '80px', borderRadius: '5px', marginBottom: '10px' }} 
                        alt="Usuario" 
                    />
                    <h2 id="nombreModal">{authService.getNombreUsuario() || 'Usuario'}</h2>
                </div>

                <div className="botones-modal">
                    <button onClick={handleCerrarSesion} className="btn-cerrar">Cerrar Sesión</button>
                    <button onClick={handleCambiarCuenta} className="btn-cambiar">Cambiar Cuenta</button>
                </div>
            </div>
        </div>
    );
};

export default ModalPerfil;