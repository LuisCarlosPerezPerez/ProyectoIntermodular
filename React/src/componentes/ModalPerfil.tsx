import React, { useState } from 'react';
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
    
    // 🌟 CORRECCIÓN CRÍTICA: Recuperamos el objeto completo de la sesión
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    const usuarioLogueado = sesionGuardada ? JSON.parse(sesionGuardada) : null;

    // Extraemos el id del objeto (comprobamos 'id' o 'id_cliente' según lo devuelva tu Java)
    const idCliente = usuarioLogueado ? (usuarioLogueado.id || usuarioLogueado.id_cliente || 0) : 0;

    if (!isOpen) return null;

    const handleCerrarSesion = () => {
        authService.logout(); // Asegúrate de que borre 'usuario_sesion' en el localStorage
        localStorage.removeItem('usuario_sesion'); // Por seguridad lo borramos explícitamente
        onClose();
        
        // Redirección inmediata al inicio con limpieza total
        window.location.href = '/'; 
    };

    const handleCambiarCuenta = () => {
        authService.logout();
        localStorage.removeItem('usuario_sesion'); // Por seguridad
        onClose();
        
        // 🌟 Redirige de una al inicio de sesión/registro y refresca
        window.location.href = '/Autenticacion'; 
    };

    return (
        <>
            <div className="overlay"> 
                <div className="modal-contenido">
                    <span className="cerrar-modal" onClick={onClose}>&times;</span>
                    
                    <div className="perfil-info">
                        <img 
                            src="Imagenes/pollo.jpg" 
                            alt="Usuario" 
                        />
                        <h2>Mi Perfil</h2>
                        {usuarioLogueado && (
                            <p style={{ color: '#00adb5', marginTop: '-10px', marginBottom: '15px' }}>
                                ¡Hola, {usuarioLogueado.usuario}!
                            </p>
                        )}
                    </div>

                    <div className="botones-modal">
                        <button 
                            onClick={() => setShowPedidos(true)} 
                            className="btn-pedidos"
                        >
                            Ver mis pedidos
                        </button>
                        <button onClick={handleCerrarSesion} className="btn-cerrar">Cerrar Sesión</button>
                        <button onClick={handleCambiarCuenta} className="btn-cambiar">Cambiar Cuenta</button>
                    </div>
                </div>
            </div>

            {/* Modal secundario de pedidos con la ID Real ya rescatada */}
            <ModalPedidos 
                isOpen={showPedidos} 
                onClose={() => setShowPedidos(false)} 
                idCliente={idCliente} 
            />
        </>
    );
};

export default ModalPerfil;