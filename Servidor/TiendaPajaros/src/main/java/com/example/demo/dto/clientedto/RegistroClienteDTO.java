package com.example.demo.dto.clientedto;

public class RegistroClienteDTO {
	private String usuario;
	private String contraseña;
	private String email;
	private int telefono;
	private String direccion;


	public RegistroClienteDTO(String usuario, String contraseña, String email, int telefono, String direccion) {
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.email = email;
		this.telefono = telefono;
		this.direccion = direccion;
	}

	public RegistroClienteDTO() {

	}


	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDirection(String direccion) {
		this.direccion = direccion;
	}

	// GETTERS Y SETTERS ANTIGUOS
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}