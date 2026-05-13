import { SesionClienteDTO, FullClienteDTO } from '../types/Cliente';

const API_URL = 'http://localhost:8080/api/clientes'; // Ajusta la URL de tu API

const clienteService = {
    login: async (credenciales: SesionClienteDTO): Promise<FullClienteDTO> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales),
        });

        if (!response.ok) {
            throw new Error('Credenciales de cliente incorrectas');
        }

        return await response.json();
    }
};

export default clienteService;