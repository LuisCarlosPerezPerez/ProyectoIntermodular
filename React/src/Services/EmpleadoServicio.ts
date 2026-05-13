import { NuevoEmpleadoDTO, FullEmpleadoDTO } from '../types/Empleado';

const API_URL = 'http://localhost:8080/api/empleados'; // Ajusta la URL de tu API

const empleadoService = {
    login: async (credenciales: NuevoEmpleadoDTO): Promise<FullEmpleadoDTO> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales),
        });

        if (!response.ok) {
            throw new Error('Credenciales de empleado incorrectas');
        }

        return await response.json();
    },

    // Aquí podrás añadir más funciones luego, como:
    // listar: () => fetch(API_URL).then(res => res.json()),
};

export default empleadoService;