package com.example.demo.servicios.interfaz;

import java.util.List;
import com.example.demo.dto.producto.*;

public interface InterfazProducto {

	List<VerProductoDTO> listarProductos();
	NuevoProductoDTO crearProductos();
	int GuardarProducto(NuevoProductoDTO producto);
	void eliminarProducto(int idProducto);
	void actualizarProducto(int id, NuevoProductoDTO productoDTO);
}