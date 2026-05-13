package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class NuevoProductoDTO {

	private String nombre;
    private int stock;
    private String descripcion;
    private double precio; 
    private List<String> contenidoImagenes = new ArrayList<>();
    
    
	public NuevoProductoDTO() {
		super();
	}

	public NuevoProductoDTO(String nombre, int stock, String descripcion, double precio, List<String> contenidoImagenes) {
		super();
		this.nombre = nombre;
		this.stock = stock;
		this.descripcion = descripcion;
		this.precio = precio;
		this.contenidoImagenes = contenidoImagenes;
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
    
    
}
