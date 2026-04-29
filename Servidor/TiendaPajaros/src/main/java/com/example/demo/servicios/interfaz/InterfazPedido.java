package com.example.demo.servicios.interfaz;
import java.util.List;

import com.example.demo.dto.pedido.*;

public interface InterfazPedido {
	
	PedidoDTO CrearPedido();
	int guardarPedido(PedidoDTO pedido);
	List<VerPedidoDTO> listarPedidos();
	
}
