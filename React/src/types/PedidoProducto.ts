import {PedidoDTO } from "./Pedido";
import {ProductoDTO } from "./Producto";

export interface PedidoProductoDTO {
  id: number;
  pedido: PedidoDTO;   
  producto: ProductoDTO; 
}