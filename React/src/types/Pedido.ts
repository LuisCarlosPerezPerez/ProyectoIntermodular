export interface PedidoDTO {
  id?: number; // Opcional al crear
  entrega: string;      
  telefono: number;
  estado: string;       
  productos: number[];  
  cantidades: number[]; 
  id_cliente: number;
  precioTotal: number;  
  direccion: string;    // 🌟 Añadido para el flujo de guardado
}

export interface VerPedidoDTO {
  id: number;
  estado: string;
  productos: number[];  
  entrega: string;      // Fecha de entrega
  direccion?: string;   // 🌟 Añadido para mostrar en el panel de empleados
  id_cliente: number;
}