import { NuevoEmpleadoDTO, FullEmpleadoDTO } from '../types/Empleado';

const API_URL = '/api/Empleado'; 

const empleadoService = {
    login: async (credenciales: NuevoEmpleadoDTO): Promise<FullEmpleadoDTO> => {
        const response = await fetch(`${API_URL}/IniciarSesion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales),
        });

        if (!response.ok) {
            throw new Error('Credenciales de empleado incorrectas');
        }

        const data: FullEmpleadoDTO = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        
        return data;
    },

    listarEmpleados: async (): Promise<FullEmpleadoDTO[]> => {
        const response = await fetch(`${API_URL}/ListarEmpleados`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el listado de empleados');
        }
        
        return await response.json();
    },

    guardarEmpleado: async (empleado: Partial<FullEmpleadoDTO>): Promise<void> => {
        const response = await fetch(`${API_URL}/GuardarEmpleado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || 'No se pudo registrar al empleado');
        }
    },

    eliminarEmpleado: async (idEmpleado: number): Promise<void> => {
        const response = await fetch(`${API_URL}/EliminarEmpleado?idEmpleado=${idEmpleado}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || 'No se pudo eliminar al empleado');
        }
    }
};

export default empleadoService;