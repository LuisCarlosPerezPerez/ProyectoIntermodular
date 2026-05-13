package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class VerProductoDTO {
    private int id_producto;
    private String nombre;
    private String descripcion;
    private int stock;
    private double precio; // Cambiado a double para soportar decimales si fuera necesario
    private List<String> contenidoImagenes = new ArrayList<>();

    // Constructor vacío (Necesario para Jackson/JSON)
    public VerProductoDTO() {
    }

    // Constructor principal para usar en el Servicio
    public VerProductoDTO(int id_producto, String nombre, String descripcion, int stock, double precio,
            List<String> contenidoImagenes) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
        this.contenidoImagenes = contenidoImagenes;
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