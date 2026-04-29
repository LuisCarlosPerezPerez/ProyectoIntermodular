package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.*;

@Entity
@Table(name = "Empleado")
public class EmpleadoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_EMPLEADO")
	private int ID_Empleado;

	@Column(name = "USUARIO")
	private String Usuario;

	@Column(name = "CONTRASEÑA")
	private String Contraseña;

	@Column(name = "ADMININISTRADOR")
	private int Administrador;

	@OneToMany(mappedBy = "empleado")
	Set<RegistroEntity> registros = new HashSet<RegistroEntity>();

	@OneToMany(mappedBy = "empleado")
	Set<ProductoEntity> productos = new HashSet<ProductoEntity>();

	public EmpleadoEntity(int iD_Empleado, String usuario, String contraseña, int administrador) {
		this.ID_Empleado = iD_Empleado;
		this.Usuario = usuario;
		this.Contraseña = contraseña;
		this.Administrador = administrador;
		this.registros = new HashSet<RegistroEntity>();
		this.productos = new HashSet<ProductoEntity>();
	}

	public EmpleadoEntity() {
	}

	public Set<ProductoEntity> getProductos() {
		return productos;
	}

	public void setProductos(Set<ProductoEntity> productos) {
		this.productos = productos;
	}

	public Set<RegistroEntity> getRegistros() {
		return registros;
	}

	public void setRegistros(Set<RegistroEntity> registros) {
		this.registros = registros;
	}

	public int getID_Empleado() {
		return ID_Empleado;
	}

	public void setID_Empleado(int iD_Empleado) {
		ID_Empleado = iD_Empleado;
	}

	public String getUsuario() {
		return Usuario;
	}

	public void setUsuario(String usuario) {
		Usuario = usuario;
	}

	public String getContraseña() {
		return Contraseña;
	}

	public void setContraseña(String contraseña) {
		Contraseña = contraseña;
	}

	public int getAdministrador() {
		return Administrador;
	}

	public void setAdministrador(int administrador) {
		Administrador = administrador;
	}

}
