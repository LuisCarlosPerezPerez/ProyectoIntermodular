package com.example.demo.servicios.interfaz;

import java.util.List;
import java.util.Map;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;

public interface InterfazEmpleado {
	
	FullEmpleadoDTO crearEmpleado();
	FullEmpleadoDTO inicarsesion(NuevoEmpleadoDTO empleadoSesion);
	void guardarEmpleado(FullEmpleadoDTO empleado);
	int modificarProducto(ProductoDTO producto);
	List<Map<String, Object>> obtenerTodosLosPedidosGlobales();
	void finalizarPedido(int id);
	
}