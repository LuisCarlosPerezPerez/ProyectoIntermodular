import { NuevoEmpleadoDTO, FullEmpleadoDTO } from '../types/Empleado';

// Al no poner "http://localhost:8080", el proxy de Vite/Webpack lo redirigirá automáticamente
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
            // El admin tiene las mismas funcionalidades que el empleado
            // pero si falla aquí, es por credenciales erróneas.
            throw new Error('Credenciales de empleado incorrectas');
        }

        const data: FullEmpleadoDTO = await response.json();
        
        // Guardamos la sesión (puedes usar un authService aparte o hacerlo aquí)
        localStorage.setItem('user', JSON.stringify(data));
        
        return data;
    },

    /**
     * Obtiene la lista completa de todos los empleados de la base de datos.
     * Vista exclusiva para el Panel de Administración.
     */
    listarEmpleados: async (): Promise<FullEmpleadoDTO[]> => {
        const response = await fetch(`${API_URL}/ListarEmpleados`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el listado de empleados');
        }
        
        return await response.json();
    },

    /**
     * Registra o actualiza a un empleado enviando el DTO completo.
     */
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

    /**
     * Elimina de forma permanente a un empleado utilizando su ID.
     */
    eliminarEmpleado: async (idEmpleado: number): Promise<void> => {
        // Enviamos el parámetro idEmpleado a través de la URL de tipo QueryParam (?idEmpleado=X)
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