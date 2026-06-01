import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import clienteService from '../Services/ClienteServicio';
import empleadoService from '../Services/EmpleadoServicio';

import Header from './Header';
import Footer from './Footer';

import '../styles/iniciosesion.css';

const Autenticacion: React.FC = () => {
    const navigate = useNavigate();
    const [showEmpleado, setShowEmpleado] = useState(false);

    const [regGmail, setRegGmail] = useState('');
    const [regUsuario, setRegUsuario] = useState('');
    const [regContrasena, setRegContrasena] = useState('');
    const [regTelefono, setRegTelefono] = useState('');
    const [regDireccion, setRegDireccion] = useState('');
    const [aceptarTerminos, setAceptarTerminos] = useState(false);

    const [userCliente, setUserCliente] = useState('');
    const [passCliente, setPassCliente] = useState('');

    const [userEmpleado, setUserEmpleado] = useState('');
    const [passEmpleado, setPassEmpleado] = useState('');

    const handleRegistroCliente = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!aceptarTerminos) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(regGmail)) {
            alert("Por favor, introduce un correo electrónico válido que sea de Gmail (ejemplo@gmail.com).");
            return;
        }

        const telefonoRegex = /^[679]\d{8}$/;
        if (!telefonoRegex.test(regTelefono)) {
            alert("El número de teléfono debe tener exactamente 9 dígitos y empezar por 6, 7 o 9.");
            return;
        }

        if (regContrasena.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres.");
            return;
        }

        try {
            const nuevoCliente = {
                usuario: regUsuario,
                contrasena: regContrasena,
                gmail: regGmail,
                telefono: Number(regTelefono),
                direccion: regDireccion
            };

            const res = await clienteService.registro(nuevoCliente);
            if (res) {
                alert("¡Registro completado con éxito! Ya puedes iniciar sesión.");
                setRegUsuario('');
                setRegContrasena('');
                setRegGmail('');
                setRegTelefono('');
                setRegDireccion('');
                setAceptarTerminos(false);
            }
        } catch (err) {
            alert("Error al registrar el cliente. Revisa los datos.");
        }
    };

    const handleLoginCliente = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await clienteService.login({ 
                usuario: userCliente, 
                contrasena: passCliente 
            });
            
            if (res) { 
                authService.login(res); 
                navigate('/'); 
                window.location.reload();
            }
        } catch (err) { 
            alert("Error en login cliente: Usuario o contraseña incorrectos"); 
        }
    };

    const handleLoginEmpleado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await empleadoService.login({ usuario: userEmpleado, contraseña: passEmpleado });
            if (res) {
                const esAdmin = res.Administrador === 1;
                
                const usuarioSesion = {
                    ...res,
                    rol: esAdmin ? 'admin' : 'empleado'
                };

                authService.login(usuarioSesion);
                navigate('/');
                window.location.reload();
            }
        } catch (err) { 
            alert("Error en login empleado"); 
        }
    };

    return (
        <>
            <Header />
            <div className="auth-cristal-page">
                <main className="auth-cristal-container">
                    <div className="auth-split-grid">

                        <div className="auth-panel-seccion">
                            <h2 className="auth-seccion-titulo">Crear Cuenta</h2>
                            <form onSubmit={handleRegistroCliente} className="auth-formulario">
                                <div className="auth-campo-grupo">
                                    <label htmlFor="reg-email" className="auth-label">Correo Electrónico (Gmail)</label>
                                    <input 
                                        id="reg-email"
                                        type="email" 
                                        className="auth-input" 
                                        placeholder="ejemplo@gmail.com" 
                                        value={regGmail}
                                        onChange={(e) => setRegGmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="auth-campo-grupo">
                                    <label htmlFor="reg-username" className="auth-label">Nombre de Usuario</label>
                                    <input 
                                        id="reg-username"
                                        type="text" 
                                        className="auth-input" 
                                        placeholder="TuUsuarioAlas" 
                                        value={regUsuario}
                                        onChange={(e) => setRegUsuario(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="auth-campo-grupo">
                                    <label htmlFor="reg-tel" className="auth-label">Teléfono de Contacto</label>
                                    <input 
                                        id="reg-tel"
                                        type="tel" 
                                        className="auth-input" 
                                        placeholder="600123456" 
                                        value={regTelefono}
                                        onChange={(e) => setRegTelefono(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="auth-campo-grupo">
                                    <label htmlFor="reg-dir" className="auth-label">Dirección de Envío</label>
                                    <input 
                                        id="reg-dir"
                                        type="text" 
                                        className="auth-input" 
                                        placeholder="Calle Cristal, Nº 4" 
                                        value={regDireccion}
                                        onChange={(e) => setRegDireccion(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="auth-campo-grupo">
                                    <label htmlFor="reg-pass" className="auth-label">Contraseña</label>
                                    <input 
                                        id="reg-pass"
                                        type="password" 
                                        className="auth-input" 
                                        placeholder="Mínimo 4 caracteres" 
                                        value={regContrasena}
                                        onChange={(e) => setRegContrasena(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="auth-checkbox-contenedor">
                                    <input 
                                        className="auth-checkbox-input" 
                                        type="checkbox" 
                                        id="terms" 
                                        checked={aceptarTerminos}
                                        onChange={(e) => setAceptarTerminos(e.target.checked)}
                                        required 
                                    />
                                    <label className="auth-checkbox-label" htmlFor="terms">
                                        Acepto los términos, condiciones y confirmo ser mayor de edad (18 años).
                                    </label>
                                </div>
                                <button type="submit" className="btn-auth-cristal">Registrarse</button>
                            </form>
                        </div>

                        <div className="auth-panel-seccion panel-derecho-separador">
                            {!showEmpleado ? (
                                <div className="login-vista-animada">
                                    <h2 className="auth-seccion-titulo">Iniciar Sesión</h2>
                                    <form onSubmit={handleLoginCliente} className="auth-formulario">
                                        <div className="auth-campo-grupo">
                                            <label htmlFor="login-client-user" className="auth-label">Usuario</label>
                                            <input
                                                id="login-client-user"
                                                type="text"
                                                className="auth-input"
                                                placeholder="Ingresa tu nombre de usuario"
                                                value={userCliente}
                                                onChange={(e) => setUserCliente(e.target.value)}
                                                required 
                                            />
                                        </div>
                                        <div className="auth-campo-grupo">
                                            <label htmlFor="login-client-pass" className="auth-label">Contraseña</label>
                                            <input
                                                id="login-client-pass"
                                                type="password"
                                                className="auth-input"
                                                placeholder="••••••••••••"
                                                value={passCliente}
                                                onChange={(e) => setPassCliente(e.target.value)}
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn-auth-cristal">Ingresar</button>
                                    </form>
                                    <button
                                        type="button"
                                        className="btn-auth-toggle-cristal"
                                        onClick={() => setShowEmpleado(true)}
                                    >
                                        💼 Acceso exclusivo para el Staff
                                    </button>
                                </div>
                            ) : (
                                <div className="login-vista-animada">
                                    <h2 className="auth-seccion-titulo t-staff">Acceso Staff</h2>
                                    <form onSubmit={handleLoginEmpleado} className="auth-formulario">
                                        <div className="auth-campo-grupo">
                                            <label htmlFor="login-emp-user" className="auth-label">Usuario Empleado</label>
                                            <input
                                                id="login-emp-user"
                                                type="text"
                                                className="auth-input"
                                                placeholder="Identificador de empleado"
                                                value={userEmpleado}
                                                onChange={(e) => setUserEmpleado(e.target.value)}
                                                required 
                                            />
                                        </div>
                                        <div className="auth-campo-grupo">
                                            <label htmlFor="login-emp-pass" className="auth-label">Contraseña</label>
                                            <input
                                                id="login-emp-pass"
                                                type="password"
                                                className="auth-input"
                                                placeholder="••••••••••••"
                                                value={passEmpleado}
                                                onChange={(e) => setPassEmpleado(e.target.value)}
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn-auth-cristal btn-staff-accent">Entrar al Panel</button>
                                    </form>
                                    <button
                                        type="button"
                                        className="btn-auth-toggle-cristal"
                                        onClick={() => setShowEmpleado(false)}
                                    >
                                        ↩️ Volver a inicio de sesión de clientes
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Autenticacion;