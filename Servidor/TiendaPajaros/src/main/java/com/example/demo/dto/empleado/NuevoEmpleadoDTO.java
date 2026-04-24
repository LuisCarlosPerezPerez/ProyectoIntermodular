package com.example.demo.dto.empleado;

public class NuevoEmpleadoDTO {

	private String usuario;
	private String contraseña;

	public NuevoEmpleadoDTO(String usuario, String contraseña) {
		this.usuario = usuario;
		this.contraseña = contraseña;
	}

	public NuevoEmpleadoDTO() {
		
	}
	

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

}
