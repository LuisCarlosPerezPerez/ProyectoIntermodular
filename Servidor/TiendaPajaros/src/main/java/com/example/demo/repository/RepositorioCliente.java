package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.ClienteEntity;

@Repository
public interface RepositorioCliente extends JpaRepository<ClienteEntity, Integer> {
	
	@Query("SELECT c FROM ClienteEntity c WHERE c.id = :id")
    ClienteEntity BuscarPorId(@Param("id") int id);


    @Query("SELECT c FROM ClienteEntity c WHERE c.usuario = :usuario AND c.contrasena = :contrasena")
    ClienteEntity BuscarPorUsuarioYContraseña(@Param("usuario") String usuario, @Param("contrasena") String contrasena);
}