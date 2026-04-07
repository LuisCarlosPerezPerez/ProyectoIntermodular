package com.example.demo.dto.pedidoproducto;
import com.example.demo.dto.producto.*;

import com.example.demo.dto.pedido.*;

public class PedidoProductoDTO {

	private int id;
	private PedidoDTO pedido; 
	private ProductoDTO producto;
	
	public PedidoProductoDTO(int id, PedidoDTO pedido, ProductoDTO producto) {
		
		this.id = id;
		this.pedido = pedido;
		this.producto = producto;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public PedidoDTO getPedido() {
		return pedido;
	}

	public void setPedido(PedidoDTO pedido) {
		this.pedido = pedido;
	}

	public ProductoDTO getProducto() {
		return producto;
	}

	public void setProducto(ProductoDTO producto) {
		this.producto = producto;
	}
	
	
}
