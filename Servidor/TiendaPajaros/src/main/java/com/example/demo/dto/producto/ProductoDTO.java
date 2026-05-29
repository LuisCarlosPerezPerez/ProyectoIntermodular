package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class ProductoDTO {
    
	private int id_producto;
	private String nombre;
	private String descripcion;
	private String categoria; 
	private int stock;
	private int vendidos; 
	private double precio; 
	private int id_empleado;
	private List<String> contenidoImagenes = new ArrayList<>();
	private List<Integer> pedidos = new ArrayList<>(); 
    
	public ProductoDTO() {
	}


	public ProductoDTO(int id_producto, String nombre, String descripcion, String categoria, int stock, int vendidos, double precio, int id_empleado,
			List<String> contenidoImagenes, List<Integer> pedidos) {
		this.id_producto = id_producto;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria; 
		this.stock = stock;
		this.vendidos = vendidos; 
		this.precio = precio;
		this.id_empleado = id_empleado;
		this.contenidoImagenes = contenidoImagenes;
		this.pedidos = pedidos;
	}
    
	public int getVendidos() {
		return vendidos;
	}

	public void setVendidos(int vendidos) {
		this.vendidos = vendidos;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public int getId_producto() {
		return id_producto;
	}
	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public double getPrecio() {
		return precio;
	}
	public void setPrecio(double precio) {
		this.precio = precio;
	}
	public int getId_empleado() {
		return id_empleado;
	}
	public void setId_empleado(int id_empleado) {
		this.id_empleado = id_empleado;
	}

	public List<Integer> getPedidos() {
		return pedidos;
	}
	public void setPedidos(List<Integer> pedidos) {
		this.pedidos = pedidos;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public List<String> getContenidoImagenes() {
		return contenidoImagenes;
	}

	public void setContenidoImagenes(List<String> contenidoImagenes) {
		this.contenidoImagenes = contenidoImagenes;
	}
}