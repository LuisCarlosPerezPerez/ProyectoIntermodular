package com.example.demo.dto.clientedto;

public class SesionClienteDTO {
    private String usuario;
    private String contrasena;

    public SesionClienteDTO(String usuario, String contrasena) {
    	
		this.usuario = usuario;
		this.contrasena = contrasena;
	}

	public SesionClienteDTO() {
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
    public void setContraseña(String contrasena) {
        this.contrasena = contrasena;
    }
}
