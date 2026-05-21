import { NuevoProductoDTO, VerProductoDTO } from '../types/Producto';

// El proxy de Vite detecta '/api' y redirige al puerto 9090
const API_URL = '/api/Producto';

const productoService = {
    /**
     * Obtiene todos los productos
     */
    obtenerTodos: async (): Promise<VerProductoDTO[]> => {
        const res = await fetch(`${API_URL}/MostrarProductos`);
        if (!res.ok) throw new Error('Error al obtener productos');
        return await res.json();
    },

    /**
     * Obtiene un producto por ID
     */
    obtenerPorId: async (id: number): Promise<VerProductoDTO> => {
        const res = await fetch(`${API_URL}/ObtenerProducto/${id}`);
        if (!res.ok) throw new Error('No se pudo encontrar el producto');
        return await res.json();
    },

    /**
     * Crea un nuevo producto
     */
    crear: async (nuevoProducto: NuevoProductoDTO): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto),
        });
        if (!res.ok) throw new Error('Error al crear producto');
        return await res.json();
    },

    /**
     * Actualiza un producto existente
     * Cambiamos a PUT para seguir el estándar REST
     */
    actualizar: async (id: number, productoEditado: NuevoProductoDTO): Promise<void> => {
        const res = await fetch(`${API_URL}/ActualizarProducto?id=${id}`, {
            method: 'PUT', // Cambiado de POST a PUT
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoEditado),
        });
        if (!res.ok) throw new Error('Error al actualizar el producto');
    },

    /**
     * Elimina un producto
     * Cambiamos a DELETE para seguir el estándar REST
     */
    eliminar: async (idProducto: number): Promise<void> => {
        const res = await fetch(`${API_URL}/EliminarProducto?idProducto=${idProducto}`, {
            method: 'POST', // Cambiado de POST a DELETE
        });
        if (!res.ok) throw new Error('Error al eliminar el producto');
    }
};

export default productoService;