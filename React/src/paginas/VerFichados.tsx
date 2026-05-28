import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import registroService from '../Services/RegistroServicio'; 
import Header from './Header';
import Footer from './Footer';
import '../styles/VerFichados.css';

interface RegistroFichaje {
    id_Registro?: number;  
    id_registro?: number;
    fecha: string;    
    fecha_entrada: string; 
    fecha_salida: string | null; 
    empleado?: number;      
    id_empleado?: number;
    usuario?: string;
}

const formatearHora = (fechaISO: string | null): string => {
    if (!fechaISO) return '';
    const partes = fechaISO.split('T');
    return partes.length > 1 ? partes[1].substring(0, 8) : fechaISO;
};

const VerFichados: React.FC = () => {
    const [registros, setRegistros] = useState<RegistroFichaje[]>([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.isLogged() || !authService.esAdmin()) {
            navigate('/');
            return;
        }
        cargarFichajesGlobales();
    }, [navigate]);

    const cargarFichajesGlobales = async () => {
        try {
            const data = await registroService.listarTodosLosRegistros();
            setRegistros(data || []);
        } catch (error) {
            console.error("Error al obtener los fichajes globales:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Header />
            <main className="tienda-container fichados-main">
                <h1 className="productos-titulo">Registro Global de Fichados</h1>
                <p className="fichados-subtitulo">Historial completo de entradas y salidas del personal de Staff</p>

                {cargando ? (
                    <div className="fichados-loading">Cargando registros místicos...</div>
                ) : registros.length === 0 ? (
                    <div className="no-productos-contenedor">
                        <p className="tabla-vacia">No hay registros de fichajes en el sistema actualmente.</p>
                    </div>
                ) : (
                    <div className="fichados-tabla-contenedor">
                        <table className="fichados-tabla">
                            <thead>
                                <tr>
                                    <th scope="col">ID Registro</th>
                                    <th scope="col">ID Empleado</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Hora Entrada</th>
                                    <th scope="col">Hora Salida</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map((reg, index) => {
                                    const tieneSalida = !!reg.fecha_salida;
                                    const idRegistroReal = reg.id_Registro ?? reg.id_registro ?? (index + 1);
                                    const idEmpleadoReal = reg.empleado ?? reg.id_empleado ?? "—";

                                    return (
                                        <tr key={idRegistroReal}>
                                            <td data-label="ID Registro">#{idRegistroReal}</td>
                                            <td data-label="ID Empleado" className="fichados-usuario">
                                                👤 Empleado #{idEmpleadoReal} {reg.usuario ? `(${reg.usuario})` : ''}
                                            </td>
                                            <td data-label="Fecha">{reg.fecha ? new Date(reg.fecha).toLocaleDateString('es-ES') : '—'}</td>
                                            <td data-label="Hora Entrada" className="hora-entrada">
                                                ⏱️ {formatearHora(reg.fecha_entrada)}
                                            </td>
                                            <td data-label="Hora Salida" className="hora-salida">
                                                {tieneSalida ? `🏁 ${formatearHora(reg.fecha_salida)}` : <span className="en-curso">En curso...</span>}
                                            </td>
                                            <td data-label="Estado">
                                                <span className={`badge-estado ${tieneSalida ? 'finalizado' : 'activo'}`}>
                                                    {tieneSalida ? 'Finalizado' : 'Trabajando'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default VerFichados;