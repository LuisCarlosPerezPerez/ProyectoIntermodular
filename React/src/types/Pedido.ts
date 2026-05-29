export interface PedidoDTO {
  id?: number;
  entrega: string;      
  telefono: number;
  estado: string;       
  productos: number[];  
  cantidades: number[]; 
  id_cliente: number;
  precioTotal: number;  
  direccion: string;  
}

export interface VerPedidoDTO {
  id: number;
  estado: string;
  productos: number[];  
  entrega: string;      
  direccion?: string;   
  id_cliente: number;
}