package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;
import com.example.demo.servicios.interfaz.InterfazEmpleado;

@RestController
@RequestMapping("/Empleado")
public class ControladorEmpleado {

    @Autowired
    private InterfazEmpleado empleadoServicio;

    @PostMapping("/IniciarSesion")
    public FullEmpleadoDTO iniciarSesion(@RequestBody NuevoEmpleadoDTO empleadoSesion) {
        return empleadoServicio.inicarsesion(empleadoSesion);
    }

    @PostMapping("/GuardarEmpleado")
    public void guardarEmpleado(@RequestBody FullEmpleadoDTO empleado) {
        empleadoServicio.guardarEmpleado(empleado);
    }

    @PostMapping("/ModificarProducto")
    public int modificarProducto(@RequestBody ProductoDTO producto) {
        return empleadoServicio.modificarProducto(producto);
    }

    @PostMapping("/FinalizarPedido")
    public void finalizarPedido(@RequestParam int idPedido) {
        empleadoServicio.finalizarPedido(idPedido);
    }

    @GetMapping("/MostrarPedidosGlobales")
    public List<Map<String, Object>> obtenerTodosLosPedidosGlobales() {
        return empleadoServicio.obtenerTodosLosPedidosGlobales();
    }
}