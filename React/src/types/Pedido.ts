export interface PedidoDTO {
  id: number;
  entrega: string;      
  telefono: number;
  estado: string;       
  productos: number[];  // IDs de los productos
  cantidades: number[]; // <--- ¡AÑADE ESTO!
  id_cliente: number;
  precioTotal: number;  // <--- ¡AÑADE ESTO!
}


export interface VerPedidoDTO {
  id: number;
  estado: string;
  productos: number[];  
  entrega: string;
  id_cliente: number;
}