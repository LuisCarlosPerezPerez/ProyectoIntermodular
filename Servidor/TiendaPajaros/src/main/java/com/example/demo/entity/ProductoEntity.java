package com.example.demo.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import jakarta.persistence.*;

@Entity
@Table(name="PRODUCTOS")
public class ProductoEntity implements Serializable {

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

	@Column(name="CATEGORIA")
	private String categoria; // NUEVO CAMPO AÑADIDO
	
	@Column(name ="PRECIO")
	private double precio; // Manteniendo el tipo double
	
	@ManyToOne
	@JoinColumn(name = "ID_EMPLEADO", nullable = true)
	private EmpleadoEntity empleado;
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
	private Set<PedidoProductoEntity> pedidos = new HashSet<>();
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductoImagenEntity> imagenes = new ArrayList<>();

	// --- MÉTODOS HELPER PARA IMÁGENES ---
	public void addImagen(ProductoImagenEntity imagen) {
		imagenes.add(imagen);
		imagen.setProducto(this);
	}

	public void removeImagen(ProductoImagenEntity imagen) {
		imagenes.remove(imagen);
		imagen.setProducto(null);
	}

	// --- GETTERS Y SETTERS ---

	public int getID_producto() {
		return ID_producto;
	}

	public void setID_producto(int ID_producto) {
		this.ID_producto = ID_producto;
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

	public String getCategoria() { // Getter de Categoría
		return categoria;
	}

	public void setCategoria(String categoria) { // Setter de Categoría
		this.categoria = categoria;
	}

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public EmpleadoEntity getEmpleado() {
		return empleado;
	}

	public void setEmpleado(EmpleadoEntity empleado) {
		this.empleado = empleado;
	}

	public Set<PedidoProductoEntity> getPedidos() {
		return pedidos;
	}

	public void setPedidos(Set<PedidoProductoEntity> pedidos) {
		this.pedidos = pedidos;
	}

	public List<ProductoImagenEntity> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<ProductoImagenEntity> imagenes) {
		this.imagenes = imagenes;
	}
}