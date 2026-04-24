package com.example.demo.repository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.pedido.*;
import com.example.demo.entity.PedidoEntity;

public interface RepositorioPedido extends JpaRepository<PedidoEntity,Integer> {

	@Query("SELECT P FROM PedidoEntity P WHERE P.id = :id")
	List<PedidoDTO>BuscarPedido(@Param("id") int id);
	
}

