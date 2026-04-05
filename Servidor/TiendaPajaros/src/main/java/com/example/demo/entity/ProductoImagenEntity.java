package com.example.demo.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "PRODUCTO_IMAGENES")
public class ProductoImagenEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_IMAGEN")
    private int idImagen;

    @ManyToOne
    @JoinColumn(name = "ID_PRODUCTO")
    private ProductoEntity producto;

    @Lob
    @Column(name = "CONTENIDO_IMAGEN", columnDefinition = "LONGBLOB")
    private byte[] contenidoImagen;


    // Getters y Setters
    public int getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(int idImagen) {
        this.idImagen = idImagen;
    }

    public ProductoEntity getProducto() {
        return producto;
    }

    public void setProducto(ProductoEntity producto) {
        this.producto = producto;
    }

    public byte[] getContenidoImagen() {
        return contenidoImagen;
    }

    public void setContenidoImagen(byte[] contenidoImagen) {
        this.contenidoImagen = contenidoImagen;
    }
}