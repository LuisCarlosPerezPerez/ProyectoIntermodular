package com.example.demo.dto.empleado;

import java.util.ArrayList;
import java.util.List;

public class FullEmpleadoDTO {

	private int ID_Empleado;
	private String Usuario;
	private String Contraseña;
	private int Administrador;
	private List<Integer> registros = new ArrayList<Integer>();
	private List<Integer> productos = new ArrayList<Integer>();

	public FullEmpleadoDTO(int iD_Empleado, String usuario, String contraseña, int administrador, List<Integer> registros,
			List<Integer> productos) {
		super();
		this.ID_Empleado = iD_Empleado;
		this.Usuario = usuario;
		this.Contraseña = contraseña;
		this.Administrador = administrador;
		this.registros = registros;
		this.productos = productos;
	}
	
	public FullEmpleadoDTO() {
		
	}

	public List<Integer> getRegistros() {
		return registros;
	}

	public void setRegistros(List<Integer> registros) {
		this.registros = registros;
	}

	public List<Integer> getProductos() {
		return productos;
	}

	public void setProductos(List<Integer> productos) {
		this.productos = productos;
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