import React, { useEffect, useState } from 'react';
import empleadoService from '../Services/EmpleadoServicio';
import { FullEmpleadoDTO } from '../types/Empleado';
import Header from './Header';
import Footer from './Footer';
import '../styles/AdminEmpleados.css'; 

const AdministrarEmpleados: React.FC = () => {
    const [empleados, setEmpleados] = useState<FullEmpleadoDTO[]>([]);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [esAdmin, setEsAdmin] = useState(0); 
    const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'success' | 'error' } | null>(null);

    useEffect(() => { 
        cargarEmpleados(); 
    }, []);

    const cargarEmpleados = async () => {
        try {
            const data = await empleadoService.listarEmpleados();
            setEmpleados(data || []);
        } catch (error: any) { 
            console.error(error); 
        }
    };

    const handleCrearEmpleado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setMensaje(null);
            await empleadoService.guardarEmpleado({ Usuario: usuario, Contraseña: contrasena, Administrador: esAdmin });
            setMensaje({ texto: '¡Empleado añadido con éxito!', tipo: 'success' });
            setUsuario(''); 
            setContrasena('');
            setEsAdmin(0);
            cargarEmpleados();
        } catch (error: any) { 
            setMensaje({ texto: error.message || 'Error al añadir el empleado', tipo: 'error' }); 
        }
    };

    const handleEliminarEmpleado = async (id: number, nombre: string) => {
        if (!window.confirm(`¿Seguro que quieres eliminar a ${nombre}?`)) return;
        try {
            setMensaje(null);
            await empleadoService.eliminarEmpleado(id);
            setMensaje({ texto: 'Empleado eliminado correctamente', tipo: 'success' });
            cargarEmpleados();
        } catch (error: any) {
            setMensaje({ texto: error.message || 'No se pudo eliminar al empleado', tipo: 'error' });
        }
    };

    return (
        <>
            <Header />
            <div className="admin-staff-page">
                <main className="admin-staff-container">
                    <h1 className="admin-staff-titulo">Administración de Staff</h1>

                    {mensaje && (
                        <div className={`alerta-admin ${mensaje.tipo}`} role="alert">
                            {mensaje.texto}
                        </div>
                    )}

                    <form className="admin-form-cristal" onSubmit={handleCrearEmpleado}>
                        <div className="admin-input-wrapper">
                            <input 
                                placeholder="Usuario" 
                                value={usuario} 
                                onChange={(e) => setUsuario(e.target.value)} 
                                aria-label="Nombre de usuario del nuevo empleado"
                                required 
                            />
                        </div>
                        <div className="admin-input-wrapper">
                            <input 
                                placeholder="Contraseña" 
                                type="password" 
                                value={contrasena} 
                                onChange={(e) => setContrasena(e.target.value)} 
                                aria-label="Contraseña del nuevo empleado"
                                required 
                            />
                        </div>

                        <select 
                            className="admin-select-cristal"
                            value={esAdmin} 
                            onChange={(e) => setEsAdmin(Number(e.target.value))}
                            aria-label="Seleccionar rol del empleado"
                        >
                            <option value={0}>💼 Empleado</option>
                            <option value={1}>👑 Admin</option>
                        </select>
                        <button className="btn-añadir-staff-cristal" type="submit">Añadir Staff</button>
                    </form>

                    <div className="admin-grid-staff">
                        {empleados.length === 0 ? (
                            <p className="grid-vacio-cristal">No hay miembros del staff registrados.</p>
                        ) : (
                            empleados.map((emp, index) => (
                                <div key={emp.ID_Empleado || `emp-${index}`} className="empleado-card-cristal">
                                    <div className="empleado-info">
                                        <span className="empleado-nombre">{emp.Usuario}</span>
                                        <span className={`empleado-rol-tag ${emp.Administrador === 1 ? 'rol-admin' : 'rol-empleado'}`}>
                                            {emp.Administrador === 1 ? '👑 Admin' : '💼 Empleado'}
                                        </span>
                                    </div>
                                    <button 
                                        className="btn-eliminar-cristal" 
                                        onClick={() => handleEliminarEmpleado(emp.ID_Empleado, emp.Usuario)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default AdministrarEmpleados;