package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.clientedto.*;
import com.example.demo.servicios.interfaz.InterfazCliente;

@RestController
@RequestMapping("/Cliente")
public class ControladorCliente {

	@Autowired
    private InterfazCliente clienteServicio;

    @PostMapping("/GuardarCliente")
    public int guardarCliente(@RequestBody RegistroClienteDTO cliente) {
        return clienteServicio.guardarcliente(cliente);
    }

    @PostMapping("/ComprobarSesion")
    public FullClienteDTO comprobarSesion(@RequestParam String usuario, @RequestParam String contraseña) {
        return clienteServicio.ComprobarSesion(usuario, contraseña);
    }

    @PostMapping("/ComprarProducto")
    public FullClienteDTO comprarProducto(@RequestBody FullClienteDTO clienteDto, @RequestParam int idProducto) {
        return clienteServicio.comprarproducto(clienteDto, idProducto);
    }

    @PostMapping("/FinalizarPedidoAutomatico")
    public FullClienteDTO finalizarPedido(@RequestParam String fechaEntrega, @RequestParam String telefono, @RequestBody Map<String, Object> payload) {
        return clienteServicio.finalizarPedidoAutomatico(fechaEntrega, telefono, payload);
    }

    @GetMapping("/MostrarProductosPedidoPendiente")
    public List<Map<String, Object>> obtenerProductosPedidoPendiente(@RequestParam int idCliente) {
        return clienteServicio.obtenerProductosPedidoPendiente(idCliente);
    }

    @GetMapping("/MostrarHistorialPedidos")
    public List<Map<String, Object>> obtenerHistorialPedidos(@RequestParam int idCliente) {
        return clienteServicio.obtenerHistorialPedidos(idCliente);
    }
}