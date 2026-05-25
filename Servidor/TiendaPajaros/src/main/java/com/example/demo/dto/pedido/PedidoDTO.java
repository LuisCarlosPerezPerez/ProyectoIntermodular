package com.example.demo.dto.pedido;

import java.util.ArrayList;
import java.util.List;

public class PedidoDTO {

    private Integer id;
    private String estado;
    private String entrega; // Cambiado a String si lo recibes como texto del frontend
    private Integer telefono;
    private Integer id_cliente;
    private Integer precioTotal;
    private List<Integer> productos = new ArrayList<>();
    private List<Integer> cantidades = new ArrayList<>();

    // Constructor vacío (Obligatorio para que Spring pueda mapear el JSON)
    public PedidoDTO() {
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getEntrega() { return entrega; }
    public void setEntrega(String entrega) { this.entrega = entrega; }

    public Integer getTelefono() { return telefono; }
    public void setTelefono(Integer telefono) { this.telefono = telefono; }

    public Integer getId_cliente() { return id_cliente; }
    public void setId_cliente(Integer id_cliente) { this.id_cliente = id_cliente; }

    public Integer getPrecioTotal() { return precioTotal; }
    public void setPrecioTotal(Integer precioTotal) { this.precioTotal = precioTotal; }

    public List<Integer> getProductos() { return productos; }
    public void setProductos(List<Integer> productos) { this.productos = productos; }

    public List<Integer> getCantidades() { return cantidades; }
    public void setCantidades(List<Integer> cantidades) { this.cantidades = cantidades; }
}