package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class VerProductoDTO {
	private int id_producto;
	private String nombre;
	private String descripcion;
	private String categoria; 
	private int stock;
	private int vendidos; // 👈 NUEVO CAMPO AÑADIDO
	private double precio; 
	private List<String> contenidoImagenes = new ArrayList<>();

	// Constructor vacío (Necesario para Jackson/JSON)
	public VerProductoDTO() {
	}

	// Constructor principal para usar en el Servicio (ACTUALIZADO)
	public VerProductoDTO(int id_producto, String nombre, String descripcion, String categoria, int stock, int vendidos, double precio,
			List<String> contenidoImagenes) {
		this.id_producto = id_producto;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria; 
		this.stock = stock;
		this.vendidos = vendidos; // 👈 ASIGNACIÓN DEL NUEVO CAMPO
		this.precio = precio;
		this.contenidoImagenes = contenidoImagenes;
	}

	// GETTER Y SETTER DEL NUEVO CAMPO
	public int getVendidos() {
		return vendidos;
	}

	public void setVendidos(int vendidos) {
		this.vendidos = vendidos;
	}

	// Getters y Setters antiguos
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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

	public List<String> getContenidoImagenes() {
		return contenidoImagenes;
	}

	public void setContenidoImagenes(List<String> contenidoImagenes) {
		this.contenidoImagenes = contenidoImagenes;
	}
}