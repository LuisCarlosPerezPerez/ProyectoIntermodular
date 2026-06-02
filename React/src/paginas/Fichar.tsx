import React, { useEffect, useState } from 'react';
import { authService } from '../Services/authServicio';
import registroService from '../Services/RegistroServicio'; 
import Header from './Header';
import Footer from './Footer';
import '../styles/Fichar.css';

interface Registro {
    id_Registro?: number;
    ID_Registro?: number;
    id_registro?: number;
    fecha: string;
    fecha_entrada: string; 
    fecha_salida: string; 
    total_horas: number;
    empleado?: number;
    id_empleado?: number;
}

const formatearHora = (fechaISO: string | null): string => {
    if (!fechaISO) return '—';
    const partes = fechaISO.split('T');
    return partes.length > 1 ? partes[1].substring(0, 8) : fechaISO;
};

const Fichar: React.FC = () => {
    const usuarioLogueado = authService.getUsuario();
    const idEmpleado = usuarioLogueado?.id_empleado || usuarioLogueado?.ID_Empleado || null;

    const [trabajando, setTrabajando] = useState<boolean>(false);
    const [historial, setHistorial] = useState<Registro[]>([]); 
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

            const registrosPropios = (datosHistorial || []).filter((reg: Registro) => {
                const idRegistroEmpleado = reg.empleado ?? reg.id_empleado;
                return Number(idRegistroEmpleado) === Number(idEmpleado);
            });

            setHistorial(registrosPropios);
        } catch (error: any) {
            setMensaje({ texto: error.message || "Error al conectar con el servidor", tipo: 'error' });
        } finally {
            setCargando(false);
        }
    };

    const handleFicharEntrada = async () => {
        try {
            setMensaje(null);
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
            <div className="cristal-fichar-page">
                <main className="container cristal-fichar-container">
                    
                    <div className="cristal-fichar-card">
                        <h2 className="cristal-fichar-titulo">Control de Jornada Laboral</h2>
                        
                        {mensaje && (
                            <div className={`cristal-alerta-fichar ${mensaje.tipo}`} role="alert">
                                {mensaje.texto}
                            </div>
                        )}

                        {cargando ? (
                            <div className="cristal-fichar-loader">
                                <div className="spinner-sutil"></div>
                                Comprobando estado del turno...
                            </div>
                        ) : (
                            <div className="cristal-fichar-actions">
                                <div className={`cristal-status-badge ${trabajando ? 'activo' : 'inactivo'}`}>
                                    <span className="cristal-dot"></span>
                                    {trabajando ? 'Estás trabajando actualmente' : 'Fuera de servicio / Pausa'}
                                </div>

                                {!trabajando ? (
                                    <button className="btn-cristal-fichar entrada" onClick={handleFicharEntrada}>
                                        <span className="icon" aria-hidden="true">⏱️</span> Registrar Entrada
                                    </button>
                                ) : (
                                    <button className="btn-cristal-fichar salida" onClick={handleFicharSalida}>
                                        <span className="icon" aria-hidden="true">🚪</span> Registrar Salida
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="cristal-historial-seccion">
                        <h3 className="cristal-historial-titulo">Tu Historial Reciente</h3>
                        <div className="cristal-tabla-responsiva">
                            <table className="cristal-tabla-fichajes">
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
                                            <td colSpan={5} className="cristal-tabla-vacia">No tienes registros de jornadas anteriores.</td>
                                        </tr>
                                    ) : (
                                        historial.map((reg, index) => {
                                            const idUnico = reg.id_Registro ?? reg.ID_Registro ?? reg.id_registro ?? index;
                                            
                                            return (
                                                <tr key={idUnico}>
                                                    <td>{reg.fecha ? new Date(reg.fecha).toLocaleDateString('es-ES') : '—'}</td>
                                                    <td className="cristal-hora-text">⏱️ {formatearHora(reg.fecha_entrada)}</td>
                                                    <td className="cristal-hora-text">
                                                        {reg.fecha_salida ? `🏁 ${formatearHora(reg.fecha_salida)}` : '—'}
                                                    </td>
                                                    <td className="cristal-hora-text">{reg.total_horas ? `${reg.total_horas}h` : '—'}</td>
                                                    <td>
                                                        <span className={`cristal-badge-tabla ${reg.fecha_salida ? 'completado' : 'en-progreso'}`}>
                                                            {reg.fecha_salida ? 'Completado' : 'Abierto'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
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