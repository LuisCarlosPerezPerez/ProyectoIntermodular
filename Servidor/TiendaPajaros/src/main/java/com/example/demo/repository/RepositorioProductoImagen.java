package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.ProductoImagenEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioProductoImagen extends JpaRepository<ProductoImagenEntity, Integer> {

}