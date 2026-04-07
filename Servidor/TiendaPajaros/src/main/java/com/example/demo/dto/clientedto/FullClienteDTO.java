package com.example.demo.dto.clientedto;

import java.util.ArrayList;
import java.util.List;

public class FullClienteDTO {
	private int id;
	private String usuario;
	private String contraseña;
	private String email;
	private List<Integer> listapedidos=new ArrayList<>();


	public FullClienteDTO(int id, String usuario, String contraseña, String email, List<Integer> list) {
		this.id = id;
		this.usuario = usuario;
		this.email = email;
		this.contraseña = contraseña;
		this.listapedidos= list;
	}

	public FullClienteDTO() {

	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	

	public List<Integer> getListapedidos() {
		return listapedidos;
	}

	public void setListapedidos(List<Integer> listapedidos) {
		this.listapedidos = listapedidos;
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

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}
	
	
	
}