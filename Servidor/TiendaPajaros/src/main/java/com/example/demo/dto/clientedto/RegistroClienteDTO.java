package com.example.demo.dto.clientedto;

public class RegistroClienteDTO {
	private String usuario;
    private String contraseña;
    private String email;


    public RegistroClienteDTO(String usuario, String contraseña, String email) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
    }


    public RegistroClienteDTO() {

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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}