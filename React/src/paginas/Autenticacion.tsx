import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import clienteService from '../Services/ClienteServicio';
import empleadoService from '../Services/EmpleadoServicio';

import Header from './Header';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/iniciosesion.css';

const Autenticacion: React.FC = () => {
    const navigate = useNavigate();
    const [showEmpleado, setShowEmpleado] = useState(false);

    // Estados para Formulario de Registro de Cliente
    const [regGmail, setRegGmail] = useState('');
    const [regUsuario, setRegUsuario] = useState('');
    const [regContrasena, setRegContrasena] = useState('');
    const [regTelefono, setRegTelefono] = useState('');
    const [regDireccion, setRegDireccion] = useState('');
    const [aceptarTerminos, setAceptarTerminos] = useState(false);

    // Estados para Iniciar Sesión de Cliente
    const [userCliente, setUserCliente] = useState('');
    const [passCliente, setPassCliente] = useState('');

    // Estados para Iniciar Sesión de Empleado
    const [userEmpleado, setUserEmpleado] = useState('');
    const [passEmpleado, setPassEmpleado] = useState('');

    // Manejador del Registro del Cliente con Validaciones
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

    // Manejador del Login del Cliente
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

    // Manejador del Login del Empleado
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
        <div className="auth-page">
            <main className="container form-container">
                <div className="row gx-5">

                    {/* COLUMNA IZQUIERDA: REGISTRO */}
                    <div className="col-md-6">
                        <h2>Registro</h2>
                        <form onSubmit={handleRegistroCliente}>
                            <div className="mb-3">
                                <label htmlFor="reg-email" className="form-label">Dirección de correo electrónico (Gmail)</label>
                                <input 
                                    id="reg-email"
                                    type="email" 
                                    className="form-control" 
                                    placeholder="abcd@gmail.com" 
                                    value={regGmail}
                                    onChange={(e) => setRegGmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reg-username" className="form-label">Nombre de Usuario</label>
                                <input 
                                    id="reg-username"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="JuanAlas123" 
                                    value={regUsuario}
                                    onChange={(e) => setRegUsuario(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="row-dual mb-3">
                                <div className="col-12">
                                    <label htmlFor="reg-tel" className="form-label">Teléfono</label>
                                    <input 
                                        id="reg-tel"
                                        type="tel" 
                                        className="form-control" 
                                        placeholder="600123456" 
                                        value={regTelefono}
                                        onChange={(e) => setRegTelefono(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reg-dir" className="form-label">Dirección de Envío</label>
                                <input 
                                    id="reg-dir"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Calle Alas de Cristal, Nº 4" 
                                    value={regDireccion}
                                    onChange={(e) => setRegDireccion(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reg-pass" className="form-label">Contraseña</label>
                                <input 
                                    id="reg-pass"
                                    type="password" 
                                    className="form-control" 
                                    placeholder="******************" 
                                    value={regContrasena}
                                    onChange={(e) => setRegContrasena(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-check checkbox-text mb-4">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="terms" 
                                    checked={aceptarTerminos}
                                    onChange={(e) => setAceptarTerminos(e.target.checked)}
                                    required 
                                />
                                <label className="form-check-label" htmlFor="terms">
                                    Aceptas los términos y condiciones de nuestra página y eres mayor de 18 años
                                </label>
                            </div>
                            <button type="submit" className="btn-auth">Registrarse</button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: LOGINS */}
                    <div className="col-md-6 border-start ps-md-5">

                        {!showEmpleado ? (
                            /* --- VISTA LOGIN CLIENTE --- */
                            <div className="login-cliente-view">
                                <h2>Iniciar Sesión</h2>
                                <form onSubmit={handleLoginCliente}>
                                    <div className="mb-3">
                                        <label htmlFor="login-client-user" className="form-label">Usuario</label>
                                        <input
                                            id="login-client-user"
                                            type="text"
                                            className="form-control"
                                            placeholder="Introduce tu nombre de usuario"
                                            value={userCliente}
                                            onChange={(e) => setUserCliente(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="login-client-pass" className="form-label">Contraseña</label>
                                        <input
                                            id="login-client-pass"
                                            type="password"
                                            className="form-control"
                                            placeholder="******************"
                                            value={passCliente}
                                            onChange={(e) => setPassCliente(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn-auth">Iniciar Sesión</button>
                                </form>
                                <button
                                    type="button"
                                    className="btn-staff-toggle mt-4"
                                    onClick={() => setShowEmpleado(true)}
                                >
                                    ¿Eres empleado? Acceso Staff
                                </button>
                            </div>
                        ) : (
                            /* --- VISTA LOGIN EMPLEADO --- */
                            <div className="login-empleado-view">
                                <h2>Acceso Staff</h2>
                                <form onSubmit={handleLoginEmpleado}>
                                    <div className="mb-3">
                                        <label htmlFor="login-emp-user" className="form-label">Usuario Empleado</label>
                                        <input
                                            id="login-emp-user"
                                            type="text"
                                            className="form-control"
                                            value={userEmpleado}
                                            onChange={(e) => setUserEmpleado(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="login-emp-pass" className="form-label">Contraseña</label>
                                        <input
                                            id="login-emp-pass"
                                            type="password"
                                            className="form-control"
                                            value={passEmpleado}
                                            onChange={(e) => setPassEmpleado(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn-auth">Entrar al Panel</button>
                                </form>
                                <button
                                    type="button"
                                    className="btn-staff-toggle mt-4"
                                    onClick={() => setShowEmpleado(false)}
                                >
                                    Volver a inicio de sesión cliente
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
        <Footer/>
        </>
    );
};

export default Autenticacion;