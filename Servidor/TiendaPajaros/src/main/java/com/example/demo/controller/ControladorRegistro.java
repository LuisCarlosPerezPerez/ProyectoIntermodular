package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.registro.*;
import com.example.demo.servicios.interfaz.InterfazRegistro;

@RestController
@RequestMapping("/Registro")
public class ControladorRegistro {

	@Autowired
    private InterfazRegistro registroServicio;

    @PostMapping("/GuardarRegistro")
    public int guardarRegistro(@RequestBody NuevoRegistroDTO newRegistro) {
        return registroServicio.GuardarRegistro(newRegistro);
    }

    @PostMapping("/GuardarHoraSalida")
    public void guardarHoraSalida(@RequestParam int idEmpleado) { 
        registroServicio.RegistrarSalida(idEmpleado);
    }

    @GetMapping("/MostrarRegistros")
    public List<RegistroDTO> listaRegistros() {
        return registroServicio.listarRegistros();
    }

    @GetMapping("/MostrarTodosLosRegistros")
    public List<RegistroDTO> listarTodosLosRegistros() {
        return registroServicio.listarTodosLosRegistros();
    }

}