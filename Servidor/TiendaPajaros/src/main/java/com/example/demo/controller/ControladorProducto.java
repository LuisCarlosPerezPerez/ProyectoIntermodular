package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.producto.*;
import com.example.demo.servicios.interfaz.InterfazProducto;

@RestController
@RequestMapping("/Producto")
public class ControladorProducto {

	@Autowired
    private InterfazProducto productoServicio;

    @GetMapping("/MostrarProductos")
    public List<VerProductoDTO> listarProductos() {
        return productoServicio.listarProductos();
    }

    @PostMapping("/GuardarProducto")
    public int guardarProducto(@RequestBody NuevoProductoDTO productoDTO) {
        return productoServicio.GuardarProducto(productoDTO);
    }

    @PostMapping("/ActualizarProducto")
    public void actualizarProducto(@RequestParam int id, @RequestBody NuevoProductoDTO productoDTO) {
        productoServicio.actualizarProducto(id, productoDTO);
    }

    @PostMapping("/EliminarProducto")
    public void eliminarProducto(@RequestParam int idProducto) {
        productoServicio.eliminarProducto(idProducto);
    }
}