export interface NuevoProductoDTO {
  nombre: string;
  stock: number;
  descripcion: string;
  categoria: string; 
  precio: number;    
  contenidoImagenes: string[]; 
}

export interface ProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  categoria: string; 
  stock: number;
  vendidos: number; 
  precio: number;
  id_empleado: number | null; 
  contenidoImagenes: string[];
  pedidos: number[]; 
}

export interface VerProductoDTO {
  id_producto: number;
  nombre: string;
  descripcion: string;
  categoria: string; 
  stock: number;
  vendidos: number; 
  precio: number;
  contenidoImagenes: string[]; 
}