package com.example.demo.servicios.interfaz;

import java.util.List;

import com.example.demo.dto.registro.*;

public interface InterfazRegistro {
	
	List<RegistroDTO> listarRegistros();
	NuevoRegistroDTO crearRegistro();
	int GuardarRegistro(NuevoRegistroDTO registro);
	void RegistrarSalida(int idEmpleado);
	List<RegistroDTO> listarTodosLosRegistros();
}
