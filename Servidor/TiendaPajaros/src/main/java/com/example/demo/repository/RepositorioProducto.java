package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.ProductoEntity;

public interface  RepositorioProducto extends JpaRepository<ProductoEntity, Integer> {
    
    @Query("SELECT p FROM ProductosEntity p WHERE p.id = :id")
    ProductoEntity BuscarPorId(@Param("id") int id);
    
    @Query("SELECT p FROM ProductosEntity p")
    Set<ProductoEntity> ObtenerTodoslosProductos();
    

    @Query("SELECT p FROM ProductosEntity p WHERE p.id = :id")
    Set<ProductoEntity> Obtenerciertosproductos(@Param("id") int id);
    
    @Query("SELECT p FROM ProductosEntity p WHERE p.nombre = :nombre")
    ProductoEntity findByNombre(@Param("nombre") String nombre);
    
    @Modifying
    @Transactional
    @Query("UPDATE ProductoEntity p SET p.nombre = :nombre, p.precio = :precio, p.stock = :stock, p.receta = :receta WHERE p.ID_producto = :id")
    void actualizarProducto(
        @Param("id") int id, 
        @Param("nombre") String nombre, 
        @Param("precio") int precio, 
        @Param("stock") int stock, 
        @Param("receta") String receta
    );
}
