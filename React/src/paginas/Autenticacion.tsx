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

    // Estados para inputs
    const [emailCliente, setEmailCliente] = useState('');
    const [passCliente, setPassCliente] = useState('');
    const [userEmpleado, setUserEmpleado] = useState('');
    const [passEmpleado, setPassEmpleado] = useState('');

    const handleLoginCliente = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await clienteService.login({ usuario: emailCliente, contraseña: passCliente });
            if (res) { authService.login(res); navigate('/'); }
        } catch (err) { alert("Error en login cliente"); }
    };

    const handleLoginEmpleado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await empleadoService.login({ usuario: userEmpleado, contraseña: passEmpleado });
            if (res) {
                authService.login(res);
                // El admin puede añadir/quitar empleados, el empleado normal no
                navigate(authService.esAdmin() ? '/admin' : '/empleado');
            }
        } catch (err) { alert("Error en login empleado"); }
    };

    return (
        <>
        <Header />
        <div className="auth-page">
            <main className="container form-container">
                <div className="row gx-5">

                    {/* COLUMNA IZQUIERDA: REGISTRO (Siempre visible) */}
                    <div className="col-md-6">
                        <h2>Registro</h2>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Dirección de correo electrónico</label>
                                <input type="email" className="form-control" placeholder="abcd@gmail.com" required />
                            </div>
                            <div className="row-dual">
                                <div className="col-6">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" placeholder="Juan" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" placeholder="Alas" required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" placeholder="******************" required />
                            </div>
                            <div className="form-check checkbox-text">
                                <input className="form-check-input" type="checkbox" id="terms" required />
                                <label className="form-check-label" htmlFor="terms">
                                    Aceptas los términos y condiciones de nuestra página y eres mayor de 18 años
                                </label>
                            </div>
                            <button type="button" className="btn-auth">Registrarse</button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: LOGINS (INTERCAMBIABLES) */}
                    <div className="col-md-6 border-start ps-md-5">

                        {!showEmpleado ? (
                            /* --- VISTA CLIENTE --- */
                            <div className="login-cliente-view">
                                <h2>Iniciar Sesión</h2>
                                <form onSubmit={handleLoginCliente}>
                                    <div className="mb-3">
                                        <label className="form-label">Dirección de correo electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="abcd@gmail.com"
                                            value={emailCliente}
                                            onChange={(e) => setEmailCliente(e.target.value)}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="******************"
                                            value={passCliente}
                                            onChange={(e) => setPassCliente(e.target.value)}
                                            required />
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
                            /* --- VISTA EMPLEADO --- */
                            <div className="login-empleado-view">
                                <h2>Acceso Staff</h2>
                                <form onSubmit={handleLoginEmpleado}>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario Empleado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userEmpleado}
                                            onChange={(e) => setUserEmpleado(e.target.value)}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={passEmpleado}
                                            onChange={(e) => setPassEmpleado(e.target.value)}
                                            required />
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