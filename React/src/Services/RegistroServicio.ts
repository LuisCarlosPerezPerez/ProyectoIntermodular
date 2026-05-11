const API_URL = "/api/Registro";

const registroService = {
    /**
     * Obtiene el historial de registros del empleado actual.
     */
    listarRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarRegistros`);
        if (!response.ok) throw new Error("Error al obtener tu historial");
        return await response.json();
    },

    /**
     * Obtiene todos los registros de todos los empleados (Vista Admin).
     */
    listarTodosLosRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarTodosLosRegistros`);
        if (!response.ok) throw new Error("Error al obtener el historial global del staff");
        return await response.json();
    },

    /**
     * REGISTRAR ENTRADA (Check-In)
     * Se usa tanto al entrar por la mañana como al volver por la tarde.
     * Crea un nuevo bloque de tiempo de trabajo.
     */
    guardarRegistro: async (idEmpleado: number) => {
        const response = await fetch(`${API_URL}/GuardarRegistro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_empleado: idEmpleado }),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "Error al registrar la entrada");
        }
        return await response.text();
    },

    /**
     * REGISTRAR SALIDA (Check-Out)
     * Se usa al irse a comer (pausa) o al terminar la jornada definitiva.
     */
    registrarSalida: async (idEmpleado: number) => {
        const response = await fetch(`${API_URL}/GuardarHoraSalida?idEmpleado=${idEmpleado}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error("Error al registrar la salida");
        return true;
    },

    /**
     * Comprobar el estado actual: ¿El empleado está trabajando ahora mismo?
     * Útil para saber si mostrar el botón de "Entrar" o "Salir".
     */
    obtenerEstadoActual: async (idEmpleado: number): Promise<{ trabajando: boolean }> => {
        const response = await fetch(`${API_URL}/EstadoActual?idEmpleado=${idEmpleado}`);
        if (!response.ok) throw new Error("No se pudo obtener el estado del turno");
        return await response.json();
    }
};

export default registroService;