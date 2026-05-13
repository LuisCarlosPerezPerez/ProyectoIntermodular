package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class ProductoDTO {
    
    private int id_producto;
    private String nombre;
    private String descripcion;
    private int stock;
    private double precio; // Cambiado a double para consistencia
    private int id_empleado;
    // CAMBIO CLAVE: List<String> para manejar Base64
    private List<String> contenidoImagenes = new ArrayList<>();
    private List<Integer> pedidos = new ArrayList<>(); 
    
    // Constructor vacío necesario para Jackson
    public ProductoDTO() {
    }

    public ProductoDTO(int id_producto, String nombre, String descripcion, int stock, double precio, int id_empleado,
            List<String> contenidoImagenes, List<Integer> pedidos) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.id_empleado = id_empleado;
        this.contenidoImagenes = contenidoImagenes;
        this.pedidos = pedidos;
    }
    
    // Getters y Setters
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