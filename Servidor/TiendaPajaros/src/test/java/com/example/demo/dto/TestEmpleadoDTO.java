package com.example.demo.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.example.demo.dto.empleado.NuevoEmpleadoDTO;

public class TestEmpleadoDTO {
	
	@Test
    void testCrearNuevoEmpleadoDTO() {

        NuevoEmpleadoDTO nuevoEmpleado = new NuevoEmpleadoDTO("Juanito", "1234");

        assertEquals("Juanito", nuevoEmpleado.getUsuario());
        assertEquals("1234", nuevoEmpleado.getContraseña());
    }

}
