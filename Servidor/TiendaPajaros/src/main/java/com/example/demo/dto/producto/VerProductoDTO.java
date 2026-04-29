package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class VerProductoDTO {
	private int id_producto;
	private String nombre;
    private String descripcion;
    private int stock;
    private int precio;
    private List<byte[]> contenidoImagenes = new ArrayList<>();
    
	public VerProductoDTO(int id_producto, String nombre, String descripcion, int stock, int precio,
			List<byte[]> contenidoImagenes) {
		super();
		this.id_producto = id_producto;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.stock = stock;
		this.precio = precio;
		this.contenidoImagenes = contenidoImagenes;
	}
	



	public VerProductoDTO(int id_producto2, String nombre2, String descripcion2, int stock2, int precio2,
			List<byte[]> listaBytes, ArrayList arrayList) {
		// TODO Auto-generated constructor stub
	}




	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public List<byte[]> getContenidoImagenes() {
		return contenidoImagenes;
	}
	public void setContenidoImagenes(List<byte[]> contenidoImagenes) {
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

	public int getPrecio() {
		return precio;
	}
	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public int getId_producto() {
		return id_producto;
	}
	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}
	
	
    
    

}
