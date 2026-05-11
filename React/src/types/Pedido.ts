export interface PedidoDTO {
  id: number;
  entrega: string;      
  telefono: number;
  estado: string;       
  productos: number[];  
  id_cliente: number;
}


export interface VerPedidoDTO {
  id: number;
  estado: string;
  productos: number[];  
  entrega: string;
  id_cliente: number;
}