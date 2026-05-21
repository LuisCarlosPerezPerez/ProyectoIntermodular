import React, { useEffect, useState } from 'react';
import empleadoService from '../Services/EmpleadoServicio';
import { FullEmpleadoDTO } from '../types/Empleado';
import Header from './Header';
import Footer from './Footer';
import '../styles/AdminEmpleados.css'; // Mueve los estilos aquí

const AdministrarEmpleados: React.FC = () => {
    const [empleados, setEmpleados] = useState<FullEmpleadoDTO[]>([]);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [esAdmin, setEsAdmin] = useState(0); 
    const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'success' | 'error' } | null>(null);

    useEffect(() => { cargarEmpleados(); }, []);

    const cargarEmpleados = async () => {
        try {
            const data = await empleadoService.listarEmpleados();
            setEmpleados(data);
        } catch (error: any) { console.error(error); }
    };

    const handleCrearEmpleado = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await empleadoService.guardarEmpleado({ Usuario: usuario, Contraseña: contrasena, Administrador: esAdmin });
            setMensaje({ texto: 'Empleado añadido', tipo: 'success' });
            setUsuario(''); setContrasena('');
            cargarEmpleados();
        } catch (error: any) { setMensaje({ texto: error.message, tipo: 'error' }); }
    };

    const handleEliminarEmpleado = async (id: number, nombre: string) => {
        if (!window.confirm(`¿Seguro que quieres eliminar a ${nombre}?`)) return;
        try {
            await empleadoService.eliminarEmpleado(id);
            setMensaje({ texto: 'Empleado eliminado', tipo: 'success' });
            cargarEmpleados();
        } catch (error: any) {
            setMensaje({ texto: error.message, tipo: 'error' });
        }
    };

    return (
        <div className="tienda-page">
            <Header />
            <main className="tienda-container">
                <h1 className="productos-titulo">Administración de Staff</h1>

                <form className="admin-form" onSubmit={handleCrearEmpleado}>
                    <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    <input placeholder="Contraseña" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    <select value={esAdmin} onChange={(e) => setEsAdmin(Number(e.target.value))}>
                        <option value={0}>Empleado</option>
                        <option value={1}>Admin</option>
                    </select>
                    <button className="btn-añadir-producto" type="submit">Añadir</button>
                </form>

                <div className="admin-grid">
                    {empleados.map(emp => (
                        <div key={emp.ID_Empleado} className="empleado-card">
                            <div className="empleado-info">
                                {/* Ahora mostramos el nombre de usuario */}
                                <span className="empleado-nombre">{emp.Usuario}</span>
                                <span className="empleado-rol">
                                    {emp.Administrador === 1 ? '👑 Admin' : '💼 Empleado'}
                                </span>
                            </div>
                            <button 
                                className="btn-eliminar" 
                                onClick={() => handleEliminarEmpleado(emp.ID_Empleado, emp.Usuario)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdministrarEmpleados;


