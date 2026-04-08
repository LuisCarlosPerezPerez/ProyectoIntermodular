package com.example.demo.servicios.interfaz;
import java.util.List;
import java.util.Map;
import com.example.demo.dto.clientedto.*;

public interface InterfazCliente {


	RegistroClienteDTO RegistroCliente();
	int guardarcliente(RegistroClienteDTO cliente);
	FullClienteDTO ComprobarSesion(String usuario,String contraseña);
	FullClienteDTO comprarproducto(FullClienteDTO clienteDto, int idProducto);
	List<Map<String, Object>> obtenerProductosPedidoPendiente(int idCliente);
	FullClienteDTO finalizarPedidoAutomatico(String fechaEntrega, String telefono, Map<String, Object> datos);
	List<Map<String, Object>> obtenerHistorialPedidos(int idCliente);
}
