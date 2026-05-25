package com.example.demo.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable; // 👈 ¡IMPORTANTE! Este import es vital para el truco del LIMIT
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.ProductoEntity;

public interface RepositorioProducto extends JpaRepository<ProductoEntity, Integer> {
    
    // Corregido: Ahora devuelve la entidad correctamente en lugar de void
    @Query("SELECT p FROM ProductoEntity p WHERE p.ID_producto = :id")
    ProductoEntity BuscarPorId(@Param("id") int id);
    
    @Query("SELECT p FROM ProductoEntity p")
    Set<ProductoEntity> ObtenerTodoslosProductos();

    @Query("SELECT p FROM ProductoEntity p WHERE p.ID_producto = :id")
    Set<ProductoEntity> Obtenerciertosproductos(@Param("id") int id);
    
    @Query("SELECT p FROM ProductoEntity p WHERE p.nombre = :nombre")
    ProductoEntity findByNombre(@Param("nombre") String nombre);
    
    // 👈 EL MÉTODO QUE ME PEDISTE PARA LOS MÁS VENDIDOS
    @Query("SELECT p FROM ProductoEntity p ORDER BY p.vendidos DESC")
    List<ProductoEntity> findTopVendidos(Pageable pageable);
 
    @Modifying
    @Transactional
    @Query("UPDATE ProductoEntity p SET p.nombre = :nombre, p.precio = :precio, p.stock = :stock, p.descripcion = :descripcion WHERE p.ID_producto = :id")
    int actualizarProducto(
        @Param("id") int id, 
        @Param("nombre") String nombre, 
        @Param("precio") double precio, // Cambiado a double si tu precio maneja decimales
        @Param("stock") int stock, 
        @Param("descripcion") String descripcion
    );
    
}