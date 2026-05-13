// types/Producto.ts (o el nombre que tenga tu archivo de interfaces)

export interface NuevoProductoDTO {
  nombre: string;
  stock: number;
  descripcion: string;
  precio: number; // En TS 'number' acepta los decimales del 'double' de Java
  contenidoImagenes: string[]; // Strings en Base64 (sin el prefijo data:image...)
}

export interface ProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  id_empleado: number | null; // Puede ser null según tu entidad ProductoEntity
  contenidoImagenes: string[];
  pedidos: number[]; 
}

export interface VerProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  contenidoImagenes: string[]; // Lista de Base64 que viene de Java
}