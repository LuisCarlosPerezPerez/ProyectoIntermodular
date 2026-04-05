package com.example.demo.entity;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name="PEDIDO_PRODUCTO")
public class PedidoProductoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_PEDIDO_PRODUCTO")
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "ID_PEDIDO")
	private PedidoEntity pedido;   
	
	@ManyToOne
	@JoinColumn(name = "ID_PRODUCTO")
	private ProductoEntity producto;
	
	@Column(name= "CANTIDAD")
	private int cantidad;
	
	
	
	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public PedidoEntity getPedido() {
		return pedido;
	}

	public void setPedido(PedidoEntity pedido) {
		this.pedido = pedido;
	}

	public ProductoEntity getProducto() {
		return producto;
	}

	public void setProducto(ProductoEntity producto) {
		this.producto = producto;
	}  
	
	
	
	
}
