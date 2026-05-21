package com.example.demo.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "CLIENTE")
public class ClienteEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_CLIENTE")
	private int id;

	@Column(name = "USUARIO")
	private String usuario;

	@Column(name = "CONTRASENA")
	private String contrasena;
	
	@Column(name = "GMAIL")
	private String gmail;


	@Column(name = "Telefono")
	private int telefono;

	@Column(name = "Direccion")
	private String direccion;

	@OneToMany(mappedBy = "cliente")
	private List<PedidoEntity> pedido;


	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getGmail() {
		return gmail;
	}

	public void setGmail(String gmail) {
		this.gmail = gmail;
	}

	public List<PedidoEntity> getPedido() {
		return pedido;
	}

	public void setPedido(List<PedidoEntity> pedido) {
		this.pedido = pedido;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}
}