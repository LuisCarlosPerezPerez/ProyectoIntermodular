package com.example.demo.dto.clientedto;

public class SesionClienteDTO {
    private String usuario;
    private String contraseña;

    public SesionClienteDTO(String usuario, String contraseña) {
    	
		this.usuario = usuario;
		this.contraseña = contraseña;
	}

	public SesionClienteDTO() {
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
