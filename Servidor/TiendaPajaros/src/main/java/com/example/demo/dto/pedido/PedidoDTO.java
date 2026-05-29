package com.example.demo.dto.pedido;

import java.util.ArrayList;
import java.util.List;

public class PedidoDTO {

    private Integer id;
    private String estado;
    private String entrega; 
    private Integer telefono;
    private Integer id_cliente;
    private Double precioTotal;
    private String direccion;
    private List<Integer> productos = new ArrayList<>();
    private List<Integer> cantidades = new ArrayList<>();

    public PedidoDTO() {
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getEntrega() {
		return entrega;
	}

	public void setEntrega(String entrega) {
		this.entrega = entrega;
	}

	public Integer getTelefono() {
		return telefono;
	}

	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}

	public Integer getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(Integer id_cliente) {
		this.id_cliente = id_cliente;
	}

	public Double getPrecioTotal() {
		return precioTotal;
	}

	public void setPrecioTotal(Double precioTotal) {
		this.precioTotal = precioTotal;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public List<Integer> getProductos() {
		return productos;
	}

	public void setProductos(List<Integer> productos) {
		this.productos = productos;
	}

	public List<Integer> getCantidades() {
		return cantidades;
	}

	public void setCantidades(List<Integer> cantidades) {
		this.cantidades = cantidades;
	}
    
    
    
}