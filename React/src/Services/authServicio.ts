const AUTH_KEY = 'usuario_sesion';

export const authService = {
    
    login: (usuario: any) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },

    getUsuario: () => {
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

    getRol: () => {
        const usuario = authService.getUsuario();
        return usuario?.rol ? usuario.rol.toLowerCase() : null;
    },

    esAdmin: (): boolean => {
        const usuario = authService.getUsuario();
        return (
            usuario?.Administrador == 1 || 
            usuario?.admininistrador == 1 || 
            usuario?.rol === 'admin'
        );
    },

    esStaff: (): boolean => {
        const rol = authService.getRol();
        return rol === 'admin' || rol === 'empleado' || authService.esAdmin();
    },

    esCliente: () => {
        return authService.getRol() === 'cliente';
    }
};