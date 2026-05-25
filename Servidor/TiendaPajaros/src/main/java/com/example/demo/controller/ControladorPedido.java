package com.example.demo.controller;

import java.util.List;
import java.util.Map;

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
	public ResponseEntity<?> guardarPedido(@RequestBody PedidoDTO dto) {
	    try {
	        // Log para ver qué llega exactamente desde React
	        System.out.println("DEBUG: Recibiendo objeto: " + dto);
	        int idPedido = pedidoServicio.guardarPedido(dto);
	        return new ResponseEntity<>(idPedido, HttpStatus.CREATED);
	    } catch (Exception e) {
	        // 🛑 Esto imprimirá en tu terminal la causa real (Ej: 'InvalidFormatException')
	        e.printStackTrace(); 
	        return new ResponseEntity<>("Error interno: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}
	@GetMapping("/ActualizarEstado")
    public ResponseEntity<?> actualizarEstado(@RequestParam("id") int id, @RequestParam("estado") String estado) {
        try {
            pedidoServicio.actualizarEstado(id, estado);
            return new ResponseEntity<>("Estado actualizado con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/MostrarPedidos")
    public ResponseEntity<List<VerPedidoDTO>> listarPedidos() {
        List<VerPedidoDTO> pedidos = pedidoServicio.listarPedidos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
}