package com.example.demo.dto.pedido;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

public class PedidoDTO {
	
	private int id;
	private Date entrega;
	private int telefono;
	private String estado;
	private Set<Integer>productos = new HashSet<Integer>();
	private int id_cliente;
	
	public PedidoDTO(int id, Date entrega, int telefono,int id_cliente) {
		this.id = id;
		this.entrega = entrega;
		this.telefono = telefono;
		this.estado = "Pendiente";
		this.productos = new HashSet<Integer>();
		this.id_cliente = id_cliente;
	}
	public PedidoDTO() {
		
	}

	public Set<Integer> getProductos() {
		return productos;
	}

	public void setProductos(Set<Integer> productos) {
		this.productos = productos;
	}
	
	public int getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(int id_cliente) {
		this.id_cliente = id_cliente;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getEntrega() {
		return entrega;
	}

	public void setEntrega(Date entrega) {
		this.entrega = entrega;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
	
}
