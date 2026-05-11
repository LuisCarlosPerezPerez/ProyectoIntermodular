
export interface NuevoProductoDTO {
  nombre: string;
  stock: number;
  descripcion: string;
  precio: number;
  contenidoImagenes: string[]; 
}

export interface ProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  id_empleado: number;
  contenidoImagenes: string[];
  pedidos: number[]; 
}

export interface VerProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  contenidoImagenes: string[];
}