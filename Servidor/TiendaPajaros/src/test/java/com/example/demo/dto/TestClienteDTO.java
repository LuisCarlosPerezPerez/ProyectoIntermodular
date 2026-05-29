package com.example.demo.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.example.demo.dto.clientedto.RegistroClienteDTO;

public class TestClienteDTO {
	
	@Test
    void testCrearRegistroClienteDTO() {

        RegistroClienteDTO nuevoCliente = new RegistroClienteDTO(
            "pollo", 
            "pollo", 
            "cliente@gmail.com", 
            654321098, 
            "Calle Falsa 123"
        );

        // 2. Comprobamos con assertEquals que cada getter devuelva el dato correcto
        assertEquals("pollo", nuevoCliente.getUsuario());
        assertEquals("pollo", nuevoCliente.getContrasena());
        assertEquals("cliente@gmail.com", nuevoCliente.getGmail());
        assertEquals(654321098, nuevoCliente.getTelefono());
        assertEquals("Calle Falsa 123", nuevoCliente.getDireccion());
    }

}
