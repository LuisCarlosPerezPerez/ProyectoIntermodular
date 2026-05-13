const AUTH_KEY = 'usuario_sesion';

export const authService = {
    /**
     * Guarda el objeto usuario en el localStorage.
     * Se recomienda que el objeto incluya el rol y el estado de administrador.
     */
    login: (usuario: any) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    },

    /**
     * Elimina la sesión actual.
     */
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },

    /**
     * Recupera el objeto de usuario parseado.
     */
    getUsuario: () => {
        const data = localStorage.getItem(AUTH_KEY);
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error al parsear el usuario de la sesión", e);
            return null;
        }
    },

    /**
     * Indica si hay una sesión activa.
     */
    isLogged: (): boolean => {
        return localStorage.getItem(AUTH_KEY) !== null;
    },

    /**
     * Obtiene el rol en minúsculas para comparaciones consistentes.
     */
    getRol: () => {
        const usuario = authService.getUsuario();
        return usuario?.rol ? usuario.rol.toLowerCase() : null;
    },

    /**
     * Determina si el usuario tiene privilegios de administrador.
     * Cubre las distintas variaciones de nombre de campo (Administrador, administrador, rol).
     */
    esAdmin: (): boolean => {
        const usuario = authService.getUsuario();
        return (
            usuario?.Administrador == 1 || 
            usuario?.admininistrador == 1 || 
            usuario?.rol === 'admin'
        );
    },

    /**
     * Verifica si el usuario pertenece al personal (Admin o Empleado).
     */
    esStaff: (): boolean => {
        const rol = authService.getRol();
        return rol === 'admin' || rol === 'empleado' || authService.esAdmin();
    },

    /**
     * Verifica si el usuario es un cliente externo.
     */
    esCliente: () => {
        return authService.getRol() === 'cliente';
    }
};