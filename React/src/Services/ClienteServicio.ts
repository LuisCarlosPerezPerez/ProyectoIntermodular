import { SesionClienteDTO, RegistroClienteDTO, FullClienteDTO } from '../types/Cliente';

const API_URL = '/api/Cliente'; 

const clienteService = {
    login: async (credenciales: SesionClienteDTO): Promise<FullClienteDTO> => {
        // Pasamos los parámetros formateados para que coincidan con @RequestParam en Java
        const params = new URLSearchParams({
            usuario: credenciales.usuario,       // El nombre de usuario escrito en el formulario
            contrasena: credenciales.contrasena  // La contraseña del formulario
        });

        const response = await fetch(`${API_URL}/ComprobarSesion?${params.toString()}`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json' 
            }
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error('Usuario o contraseña incorrectos');
            throw new Error('Error en el login');
        }
        
        return await response.json();
    },

    registro: async (datosCliente: RegistroClienteDTO): Promise<boolean> => {
        const response = await fetch(`${API_URL}/GuardarCliente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: datosCliente.usuario,
                contrasena: datosCliente.contrasena, 
                // Asegúrate de que este nombre coincida con el atributo de tu RegistroClienteDTO en Java:
                gmail: datosCliente.gmail, 
                telefono: datosCliente.telefono,
                direccion: datosCliente.direccion
            }),
        });

        if (!response.ok) throw new Error('Error en el registro');
        const resultado = await response.json();
        return resultado > 0; 
    }
};

export default clienteService;