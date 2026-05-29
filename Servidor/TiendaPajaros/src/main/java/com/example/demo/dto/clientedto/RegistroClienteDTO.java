package com.example.demo.dto.clientedto;

public class RegistroClienteDTO {
    private String usuario;
    private String contrasena;
    private String gmail; 
    private int telefono;
    private String direccion;

    public RegistroClienteDTO(String usuario, String contrasena, String gmail, int telefono, String direccion) {
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.gmail = gmail;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    public RegistroClienteDTO() {
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

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
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

    public void setDireccion(String direccion) { // 👈 Corregido el typo 'setDirection'
        this.direccion = direccion;
    }
}