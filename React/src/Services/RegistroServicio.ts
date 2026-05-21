// Volvemos a poner /api porque tu proxy de Vite lo necesita para interceptar la petición
const API_URL = "/api/Registro"; 

const registroService = {
    /**
     * Obtiene el historial de registros del empleado actual.
     */
    listarRegistros: async (idEmpleado: number) => {
        // Añadimos el parámetro idEmpleado que espera tu @GetMapping("/MostrarRegistros")
        const response = await fetch(`${API_URL}/MostrarRegistros?idEmpleado=${idEmpleado}`);
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
     * Enviamos el NuevoRegistroDTO completo para evitar el Error 500
     */
    guardarRegistro: async (idEmpleado: number) => {
        const ahora = new Date();
        
        // SOLUCIÓN: Obtener la fecha y hora local ajustando los desfases manualmente
        // Esto genera un formato YYYY-MM-DD idéntico a tu zona horaria
        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0');
        const dia = String(ahora.getDate()).padStart(2, '0');
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        const fechaLocal = `${anio}-${mes}-${dia}`;
        const fechaEntradaLocalISO = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

        const nuevoRegistroDTO = {
            fecha: fechaLocal,               // YYYY-MM-DD local
            fecha_entrada: fechaEntradaLocalISO, // YYYY-MM-DDTHH:mm:ss local
            id_empleado: idEmpleado
        };

        const response = await fetch(`${API_URL}/GuardarRegistro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoRegistroDTO),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "Error al registrar la entrada");
        }
        return await response.text();
    },

    /**
     * REGISTRAR SALIDA (Check-Out)
     * Pasamos el idEmpleado por la URL usando el proxy
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
     * Llama al nuevo endpoint que agregamos en el Controlador de Java
     */
    obtenerEstadoActual: async (idEmpleado: number): Promise<{ trabajando: boolean }> => {
        const response = await fetch(`${API_URL}/EstadoActual?idEmpleado=${idEmpleado}`);
        if (!response.ok) throw new Error("No se pudo obtener el estado del turno");
        return await response.json();
    }
};

export default registroService;