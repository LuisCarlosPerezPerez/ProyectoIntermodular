import React, { useEffect, useState } from 'react';
import { authService } from '../Services/authServicio';
import registroService from '../Services/RegistroServicio'; 
import { Registro } from '../types/Registro'; // Importamos tu interfaz real
import Header from './Header';
import Footer from './Footer';
import '../styles/Fichar.css';

const Fichar: React.FC = () => {
    const usuarioLogueado = authService.getUsuario();
    // Extraemos el ID del empleado logueado
    const idEmpleado = usuarioLogueado?.id_empleado || usuarioLogueado?.ID_Empleado || null;

    const [trabajando, setTrabajando] = useState<boolean>(false);
    const [historial, setHistorial] = useState<Registro[]>([]); // Usamos tu tipo Registro
    const [cargando, setCargando] = useState<boolean>(true);
    const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'error' | 'exito' } | null>(null);

    useEffect(() => {
        if (idEmpleado) {
            cargarEstadoYHistorial();
        } else {
            setMensaje({ texto: "No se encontró el ID del empleado conectado.", tipo: 'error' });
            setCargando(false);
        }
    }, [idEmpleado]);

    const cargarEstadoYHistorial = async () => {
        try {
            setCargando(true);
            const estado = await registroService.obtenerEstadoActual(idEmpleado);
            setTrabajando(estado.trabajando);

            const datosHistorial = await registroService.listarRegistros(idEmpleado);
            setHistorial(datosHistorial);
        } catch (error: any) {
            setMensaje({ texto: error.message || "Error al conectar con el servidor", tipo: 'error' });
        } finally {
            setCargando(false);
        }
    };

    const handleFicharEntrada = async () => {
        try {
            setMensaje(null);
            // IMPORTANTE: Enviamos 'id_empleado' exactamente en minúsculas como pide tu modelo
            await registroService.guardarRegistro(idEmpleado);
            setMensaje({ texto: "¡Entrada registrada con éxito! Buen turno.", tipo: 'exito' });
            await cargarEstadoYHistorial();
        } catch (error: any) {
            setMensaje({ texto: error.message || "No se pudo registrar la entrada.", tipo: 'error' });
        }
    };

    const handleFicharSalida = async () => {
        try {
            setMensaje(null);
            await registroService.registrarSalida(idEmpleado);
            setMensaje({ texto: "¡Salida registrada correctamente! Descansa.", tipo: 'exito' });
            await cargarEstadoYHistorial();
        } catch (error: any) {
            setMensaje({ texto: error.message || "No se pudo registrar la salida.", tipo: 'error' });
        }
    };

    return (
        <>
            <Header />
            <div className="fichar-page">
                <main className="container fichar-container">
                    
                    {/* TARJETA DE CONTROL DE ACCESO */}
                    <div className="fichar-card">
                        <h2>Control de Jornada Laboral</h2>
                        <p className="subtitulo">
                            Empleado: <strong>{usuarioLogueado?.Nombre || 'Usuario'} {usuarioLogueado?.Apellido || ''}</strong>
                        </p>
                        
                        {mensaje && (
                            <div className={`alerta-fichar ${mensaje.tipo}`}>
                                {mensaje.texto}
                            </div>
                        )}

                        {cargando ? (
                            <div className="fichar-loader">Comprobando estado del turno...</div>
                        ) : (
                            <div className="fichar-actions">
                                <div className={`status-badge ${trabajando ? 'activo' : 'inactivo'}`}>
                                    <span className="dot"></span>
                                    {trabajando ? 'Estás trabajando actualmente' : 'Fuera de servicio / Pausa'}
                                </div>

                                {!trabajando ? (
                                    <button className="btn-fichar entrada" onClick={handleFicharEntrada}>
                                        <span className="icon">⏱️</span> Registrar Entrada
                                    </button>
                                ) : (
                                    <button className="btn-fichar salida" onClick={handleFicharSalida}>
                                        <span className="icon">🚪</span> Registrar Salida
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* TABLA DE HISTORIAL DE REGISTROS */}
                    <div className="historial-seccion">
                        <h3>Tu Historial Reciente</h3>
                        <div className="tabla-responsiva">
                            <table className="tabla-fichajes">
                               <thead>
                                   <tr>
                                       <th>Fecha</th>
                                       <th>Hora Entrada</th>
                                       <th>Hora Salida</th>
                                       <th>Total Horas</th>
                                       <th>Estado</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {historial.length === 0 ? (
                                       <tr>
                                           <td colSpan={5} className="tabla-vacia">No hay registros de jornadas anteriores.</td>
                                       </tr>
                                   ) : (
                                       historial.map((reg) => (
                                           <tr key={reg.ID_Registro}>
                                               {/* Convertimos la fecha a formato local legible */}
                                               <td>{reg.fecha ? new Date(reg.fecha).toLocaleDateString() : '—'}</td>
                                               
                                               {/* Pintamos los strings directamente sin procesar fechas rotas */}
                                               <td className="hora-text">{reg.fecha_entrada || '—'}</td>
                                               <td className="hora-text">{reg.fecha_salida || '—'}</td>
                                               
                                               {/* Mostramos el cálculo de horas que hace tu backend */}
                                               <td className="hora-text">{reg.total_horas ? `${reg.total_horas}h` : '—'}</td>
                                               <td>
                                                   <span className={`badge-tabla ${reg.fecha_salida ? 'completado' : 'en-progreso'}`}>
                                                       {reg.fecha_salida ? 'Completado' : 'Abierto'}
                                                   </span>
                                               </td>
                                           </tr>
                                       ))
                                   )}
                               </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
            <Footer />
        </>
    );
};

export default Fichar;