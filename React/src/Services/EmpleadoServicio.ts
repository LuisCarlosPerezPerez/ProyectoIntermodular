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
};

export default empleadoService;