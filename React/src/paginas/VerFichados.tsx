import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authServicio';
import registroService from '../Services/RegistroServicio'; // Importamos tu servicio real
import Header from './Header';
import Footer from './Footer';
import '../styles/VerFichados.css';

// Adaptado perfectamente a la estructura de tu backend
interface RegistroFichaje {
    id_registro: number;
    id_empleado: number;
    usuario?: string; // Por si devuelves el nombre mapeado desde Java
    fecha: string;    // YYYY-MM-DD
    fecha_entrada: string; // YYYY-MM-DDTHH:mm:ss
    fecha_salida: string | null; // YYYY-MM-DDTHH:mm:ss o null
}

const VerFichados: React.FC = () => {
    const [registros, setRegistros] = useState<RegistroFichaje[]>([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Seguridad: si no es administrador, rebota a la raíz
        if (!authService.isLogged() || !authService.esAdmin()) {
            navigate('/');
            return;
        }
        cargarFichajesGlobales();
    }, [navigate]);

    const cargarFichajesGlobales = async () => {
        try {
            // Usamos tu función exacta del servicio
            const data = await registroService.listarTodosLosRegistros();
            setRegistros(data);
        } catch (error) {
            console.error("Error al obtener los fichajes globales:", error);
        } finally {
            setCargando(false);
        }
    };

    // Función auxiliar para limpiar la fecha ISO (YYYY-MM-DDTHH:mm:ss -> HH:mm:ss)
    const formatearHora = (fechaISO: string | null): string => {
        if (!fechaISO) return '';
        const partes = fechaISO.split('T');
        return partes.length > 1 ? partes[1] : fechaISO;
    };

    return (
        <div className="tienda-page">
            <Header />
            <main className="tienda-container fichados-main">
                <h1 className="productos-titulo">Registro Global de Fichados</h1>
                <p className="fichados-subtitulo">Historial completo de entradas y salidas del personal de Staff</p>

                {cargando ? (
                    <div className="fichados-loading">Cargando registros místicos...</div>
                ) : registros.length === 0 ? (
                    <div className="no-productos-contenedor">
                        <p style={{ textAlign: 'center', padding: '20px', color: '#fff' }}>
                            No hay registros de fichajes en el sistema actualmente.
                        </p>
                    </div>
                ) : (
                    <div className="fichados-tabla-contenedor">
                        <table className="fichados-tabla">
                            <thead>
                                <tr>
                                    <th>ID Registro</th>
                                    <th>ID Empleado</th>
                                    <th>Fecha</th>
                                    <th>Hora Entrada</th>
                                    <th>Hora Salida</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map((reg) => {
                                    const tieneSalida = !!reg.fecha_salida;
                                    return (
                                        <tr key={reg.id_registro}>
                                            <td data-label="ID Registro">#{reg.id_registro}</td>
                                            <td data-label="ID Empleado" className="fichados-usuario">
                                                👤 Empleado #{reg.id_empleado} {reg.usuario ? `(${reg.usuario})` : ''}
                                            </td>
                                            <td data-label="Fecha">{reg.fecha}</td>
                                            <td data-label="Hora Entrada" className="hora-entrada">
                                                ⏱️ {formatearHora(reg.fecha_entrada)}
                                            </td>
                                            <td data-label="Hora Salida" className="hora-salida">
                                                {tieneSalida ? (
                                                    `🏁 ${formatearHora(reg.fecha_salida)}`
                                                ) : (
                                                    <span className="en-curso">En curso...</span>
                                                )}
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
        </div>
    );
};

export default VerFichados;