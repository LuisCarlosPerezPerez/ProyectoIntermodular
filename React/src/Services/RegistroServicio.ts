const API_URL = "/api/Registro"; 

const registroService = {

    listarRegistros: async (idEmpleado: number) => {
        const response = await fetch(`${API_URL}/MostrarRegistros?idEmpleado=${idEmpleado}`);
        if (!response.ok) throw new Error("Error al obtener tu historial");
        return await response.json();
    },

    listarTodosLosRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarTodosLosRegistros`);
        if (!response.ok) throw new Error("Error al obtener el historial global del staff");
        return await response.json();
    },

    guardarRegistro: async (idEmpleado: number) => {
        const ahora = new Date();
        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0');
        const dia = String(ahora.getDate()).padStart(2, '0');
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');
        const fechaLocal = `${anio}-${mes}-${dia}`;
        const fechaEntradaLocalISO = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

        const nuevoRegistroDTO = {
            fecha: fechaLocal,               
            fecha_entrada: fechaEntradaLocalISO, 
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


    registrarSalida: async (idEmpleado: number) => {
        const response = await fetch(`${API_URL}/GuardarHoraSalida?idEmpleado=${idEmpleado}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error("Error al registrar la salida");
        return true;
    },


    obtenerEstadoActual: async (idEmpleado: number): Promise<{ trabajando: boolean }> => {
        const response = await fetch(`${API_URL}/EstadoActual?idEmpleado=${idEmpleado}`);
        if (!response.ok) throw new Error("No se pudo obtener el estado del turno");
        return await response.json();
    }
};

export default registroService;