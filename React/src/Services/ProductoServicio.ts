import type { VerProductoDTO, ProductoDTO, NuevoProductoDTO } from '../types/Producto';

const API_URL = '/api/productos';

const productoService = {
    /**
     * Lista todos los productos (Vista de Cliente/Empleado)
     */
    listar: async (): Promise<VerProductoDTO[]> => {
        const resp = await fetch(`${API_URL}/MostrarProductos`);
        if (!resp.ok) throw new Error("Error al obtener productos");
        return await resp.json();
    },

    /**
     * Obtiene el detalle completo para edición o vista detallada
     */
    obtenerPorId: async (id: number): Promise<ProductoDTO> => {
        const resp = await fetch(`${API_URL}/DetalleProducto?id=${id}`);
        if (!resp.ok) throw new Error("Error al obtener detalles del producto");
        return await resp.json();
    },

    /**
     * Crea un producto nuevo con sus imágenes en Base64
     */
    guardar: async (producto: NuevoProductoDTO): Promise<void> => {
        const resp = await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!resp.ok) throw new Error("Error al guardar el producto");
    },

    /**
     * Elimina un producto enviando el ID en el cuerpo
     */
    eliminar: async (id: number): Promise<void> => {
        const resp = await fetch(`${API_URL}/EliminarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id) 
        });
        if (!resp.ok) throw new Error("No se pudo eliminar el producto");
    },

    /**
     * Actualiza nombre, descripción e imágenes
     */
    actualizarProducto: async (id: number, datos: any): Promise<boolean> => {
        const response = await fetch(`${API_URL}/ActualizarProducto?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });
        if (!response.ok) throw new Error("Error al actualizar el producto");
        return true;
    },

    /**
     * Aumentar o disminuir stock
     * Envía la nueva cantidad total o el diferencial según tu backend
     */
    gestionarStock: async (id: number, nuevoStock: number): Promise<void> => {
        const response = await fetch(`${API_URL}/ActualizarStock?id=${id}`, {
            method: 'PUT', // O PATCH según tu controlador
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoStock),
        });
        if (!response.ok) throw new Error("Error al modificar el stock");
    }
};

export default productoService;