package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.pedido.PedidoDTO;
import com.example.demo.dto.pedido.VerPedidoDTO;
import com.example.demo.servicios.interfaz.InterfazPedido;

@RestController
@RequestMapping("/Pedido")
public class ControladorPedido {

	@Autowired
    private InterfazPedido pedidoServicio;

    @PostMapping("/GuardarPedido")
    public int guardarPedido(@RequestBody PedidoDTO dto) {
        return pedidoServicio.guardarPedido(dto);
    }

    @GetMapping("/MostrarPedidos")
    public List<VerPedidoDTO> listarPedidos() {
        return pedidoServicio.listarPedidos();
    }
}