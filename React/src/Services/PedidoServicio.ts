import type { PedidoDTO, VerPedidoDTO } from '../types/Pedido';

const API_BASE_URL = 'http://localhost:9090/api/Pedidos';

export const pedidoService = {
  /**
   * Crea un nuevo pedido (Usado por Clientes)
   */
  crearPedido: async (nuevoPedido: PedidoDTO): Promise<PedidoDTO> => {
    try {
      const token = localStorage.getItem('token');
      
      const respuesta = await fetch(`${API_BASE_URL}/Crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevoPedido)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al procesar el pedido');
      }

      return await respuesta.json();
    } catch (error) {
      console.error("Error en crearPedido:", error);
      throw error;
    }
  },

  /**
   * Obtiene un pedido por ID con la estructura completa
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
   * Obtiene la lista completa de pedidos (Para el Empleado/Admin)
   */
  listarTodos: async (): Promise<VerPedidoDTO[]> => {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_BASE_URL}/ListarTodos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!respuesta.ok) throw new Error('Error al obtener la lista de pedidos');
    return await respuesta.json();
  },

  /**
   * Actualiza el estado de un pedido (Pendiente, Enviado, Cancelado)
   */
  actualizarEstado: async (id: number, nuevoEstado: string): Promise<boolean> => {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_BASE_URL}/ActualizarEstado?id=${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ estado: nuevoEstado })
    });

    if (!respuesta.ok) throw new Error('Error al actualizar el estado del pedido');
    return true;
  }
};