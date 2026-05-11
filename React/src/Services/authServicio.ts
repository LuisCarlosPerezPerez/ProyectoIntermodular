import { FullEmpleadoDTO } from '../types/Empleado';
import { FullClienteDTO } from '../types/Cliente';

const AUTH_KEY = 'usuario_sesion';

// Definimos un tipo unión para saber con qué estamos trabajando
type UsuarioSesion = FullEmpleadoDTO | FullClienteDTO;

export const authService = {
    // Guarda cualquier tipo de usuario (Cliente o Empleado)
    login: (usuario: UsuarioSesion) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },

    getUsuario: (): UsuarioSesion | null => {
        const data = localStorage.getItem(AUTH_KEY);
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error al parsear el usuario de la sesión", e);
            return null;
        }
    },

    isLogged: (): boolean => {
        return localStorage.getItem(AUTH_KEY) !== null;
    },

    /**
     * LÓGICA DE ROLES BASADA EN TUS DTOS
     */

    // Verifica si es el Administrador (según tu DTO: Administrador === 1)
    esAdmin: (): boolean => {
        const usuario = authService.getUsuario() as FullEmpleadoDTO;
        return usuario?.Administrador === 1;
    },

    // Verifica si es parte del staff (sea Admin o Empleado normal)
    // En tu BBDD, si tiene ID_Empleado es que es staff.
    esStaff: (): boolean => {
        const usuario = authService.getUsuario() as FullEmpleadoDTO;
        return usuario?.ID_Empleado !== undefined;
    },

    // Verifica si es un Cliente
    // En tu BBDD, los clientes tienen 'id' (minúscula) y 'email'
    esCliente: (): boolean => {
        const usuario = authService.getUsuario() as FullClienteDTO;
        return usuario?.id !== undefined && !authService.esStaff();
    },

    // Obtener el nombre para mostrar en la UI
    getNombreUsuario: (): string => {
        const usuario = authService.getUsuario();
        // En Empleado es 'Usuario' (Mayúscula), en Cliente es 'usuario' (Minúscula)
        return (usuario as FullEmpleadoDTO)?.Usuario || (usuario as FullClienteDTO)?.usuario || 'Invitado';
    }
};