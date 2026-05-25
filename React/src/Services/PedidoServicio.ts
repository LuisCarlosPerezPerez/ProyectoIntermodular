import type { PedidoDTO, VerPedidoDTO } from '../types/Pedido';

// Al empezar por '/api', Vite lo interceptará y lo enviará al puerto 9090 automáticamente
const API_BASE_URL = '/api/Pedido'; 

export const pedidoService = {
  /**
   * Crea un nuevo pedido (Usado por Clientes)
   */
  crearPedido: async (nuevoPedido: PedidoDTO): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      
      // Esto llamará internamente a http://localhost:9090/Pedido/GuardarPedido
      const respuesta = await fetch(`${API_BASE_URL}/GuardarPedido`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevoPedido)
      });

      if (!respuesta.ok) {
        const errorTexto = await respuesta.text();
        throw new Error(errorTexto || 'Error al procesar el pedido');
      }

      const data = await respuesta.text();
      return { id: parseInt(data) };
    } catch (error) {
      console.error("Error en crearPedido:", error);
      throw error;
    }
  },

  /**
   * Obtiene la lista completa de pedidos (Para el Empleado/Admin)
   */
  listarTodos: async (): Promise<VerPedidoDTO[]> => {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_BASE_URL}/MostrarPedidos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!respuesta.ok) throw new Error('Error al obtener la lista de pedidos');
    return await respuesta.json();
  },

  /**
   * Obtiene un pedido por ID
   */
  obtenerPedidoPorId: async (id: number): Promise<VerPedidoDTO> => {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!respuesta.ok) throw new Error('No se encontró el pedido');
    return await respuesta.json();
  },

  /**
   * Listar por cliente
   */
  listarPorCliente: async (idCliente: number): Promise<VerPedidoDTO[]> => {
    try {
      const token = localStorage.getItem('token');
      // 🌟 Apunta directamente a ControladorCliente
      const respuesta = await fetch(`/api/Cliente/MostrarHistorialPedidos?idCliente=${idCliente}`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!respuesta.ok) throw new Error('Error al obtener tus pedidos');
      
      return await respuesta.json();
    } catch (error) {
      console.error("Error en listarPorCliente:", error);
      throw error;
    }
  },

  /**
   * Actualiza el estado de un pedido (Método Definitivo por GET)
   */
  actualizarEstado: async (id: number, nuevoEstado: string) => {
    try {
        const token = localStorage.getItem('token');
        
        // Construimos la URL uniendo los parámetros de forma limpia
        const url = `${API_BASE_URL}/ActualizarEstado?id=${id}&estado=${nuevoEstado}`;
        
        const respuesta = await fetch(url, {
            method: 'GET', // Cambiado a GET para evitar bloqueos de CORS/CSRF en el proxy
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            throw new Error(errorTexto || 'Error al cambiar el estado');
        }

        return await respuesta.text();
    } catch (error: any) {
        console.error("Error en actualizarEstado:", error);
        throw error;
    }
  }
};