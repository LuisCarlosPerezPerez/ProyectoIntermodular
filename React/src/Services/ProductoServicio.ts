import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';

const API_URL = '/api/Producto';

const productoService = {
    obtenerTodos: async (): Promise<VerProductoDTO[]> => {
        const res = await fetch(`${API_URL}/MostrarProductos`);
        if (!res.ok) throw new Error('Error al obtener productos');
        return await res.json();
    },

    listarMasVendidos: async (): Promise<VerProductoDTO[]> => {
        const res = await fetch(`${API_URL}/MasVendidos`);
        if (!res.ok) throw new Error('Error al obtener los productos más vendidos');
        return await res.json();
    },

    obtenerPorId: async (id: number): Promise<VerProductoDTO> => {
        const res = await fetch(`${API_URL}/ObtenerProducto/${id}`);
        if (!res.ok) throw new Error('No se pudo encontrar el producto');
        return await res.json();
    },

    crear: async (nuevoProducto: NuevoProductoDTO): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto),
        });
        if (!res.ok) throw new Error('Error al crear producto');
        return await res.json();
    },

    actualizar: async (id: number, productoEditado: NuevoProductoDTO): Promise<void> => {
        const res = await fetch(`${API_URL}/ActualizarProducto?id=${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoEditado),
        });
        if (!res.ok) throw new Error('Error al actualizar el producto');
    },

    eliminar: async (idProducto: number): Promise<void> => {
        const res = await fetch(`${API_URL}/EliminarProducto?idProducto=${idProducto}`, {
            method: 'POST', 
        });
        if (!res.ok) throw new Error('Error al eliminar el producto');
    }
};

export default productoService;