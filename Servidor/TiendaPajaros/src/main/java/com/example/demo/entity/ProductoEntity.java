package com.example.demo.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="PRODUCTOS")
public class ProductoEntity implements Serializable{

	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_PRODUCTO")
    private int ID_producto;
    
    @Column(name="NOMBRE")
    private String nombre;
    
    @Column(name="STOCK")
    private int stock;
    
    @Column(name="DESCRIPCION")
    private String descripcion;
    
    @Column(name ="PRECIO")
    private int precio;
    
    @ManyToOne
    @JoinColumn(name = "ID_EMPLEADO", nullable = true)
    private EmpleadoEntity empleado;
    

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
	private Set<PedidoProductoEntity> Pedidos = new HashSet<PedidoProductoEntity>();

	public Set<PedidoProductoEntity> getPedidos() {
		return Pedidos;
	}

	public void setPedidos(Set<PedidoProductoEntity> pedidos) {
		Pedidos = pedidos;
	}

	public int getID_producto() {
		return ID_producto;
	}

	public void setID_producto(int iD_producto) {
		ID_producto = iD_producto;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public EmpleadoEntity getEmpleado() {
		return empleado;
	}

	public void setEmpleado(EmpleadoEntity empleado) {
		this.empleado = empleado;
	}

    
}
