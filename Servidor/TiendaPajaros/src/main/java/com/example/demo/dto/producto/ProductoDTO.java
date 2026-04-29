package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class ProductoDTO {
    
    private int id_producto;
    private String nombre;
    private String descripcion;
    private int stock;
    private int precio;
    private int id_empleado;
    private List<byte[]> contenidoImagenes = new ArrayList<>();
    private List<Integer> pedidos = new ArrayList<>(); 
    
    public ProductoDTO(int id_producto, String nombre, String descripcion, int stock, int precio, int id_empleado,
			List<byte[]> contenidoImagenes, List<Integer> pedidos) {
		super();
		this.id_producto = id_producto;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.stock = stock;
		this.precio = precio;
		this.id_empleado = id_empleado;
		this.contenidoImagenes = contenidoImagenes;
		this.pedidos = pedidos;
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
    public int getPrecio() {
        return precio;
    }
    public void setPrecio(int precio) {
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

	public List<byte[]> getContenidoImagenes() {
		return contenidoImagenes;
	}

	public void setContenidoImagenes(List<byte[]> contenidoImagenes) {
		this.contenidoImagenes = contenidoImagenes;
	}
}