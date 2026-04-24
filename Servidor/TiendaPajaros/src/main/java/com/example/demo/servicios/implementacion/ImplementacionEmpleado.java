package com.example.demo.servicios.implementacion;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;
import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.repository.RepositorioProducto;
import com.example.demo.servicios.interfaz.InterfazEmpleado;


@Service
public class ImplementacionEmpleado implements InterfazEmpleado {

	@Autowired
	private RepositorioEmpleado repositorioEmpleado;

	@Autowired
	private RepositorioProducto productoRepository;
	
	@Autowired
	private RepositorioPedido pedidorepository;
	@Override
	public void guardarEmpleado(FullEmpleadoDTO empleado) {
		EmpleadoEntity entidad = new EmpleadoEntity(empleado.getID_Empleado(), empleado.getUsuario(),
				empleado.getContraseña(), empleado.getAdministrador());
		repositorioEmpleado.save(entidad);
	}

	@Override
	public int modificarProducto(ProductoDTO producto) {
		ProductoEntity entidad = productoRepository.findById(producto.getId_producto()).orElse(null);
		if (entidad != null) {
			entidad.setNombre(producto.getNombre());
			entidad.setStock(producto.getStock());
			entidad.setDescripcion(producto.getDescripcion());
			entidad.setPrecio(producto.getPrecio());
			productoRepository.save(entidad);
		}
		return entidad.getID_producto();
	}


	public FullEmpleadoDTO inicarsesion(NuevoEmpleadoDTO empleadoSesion) {
		EmpleadoEntity entidad = repositorioEmpleado.FindbyUsuario(empleadoSesion.getUsuario(),
				empleadoSesion.getContraseña());
		FullEmpleadoDTO empleado = new FullEmpleadoDTO(entidad.getID_Empleado(), entidad.getUsuario(), entidad.getContraseña(), entidad.getAdministrador());

		return empleado;
	}

	public FullEmpleadoDTO crearEmpleado() {
		return new FullEmpleadoDTO();
	}

	public void finalizarPedido(int idPedido) {
	    PedidoEntity pedido = pedidorepository.findById(idPedido)
	            .orElseThrow(() -> new RuntimeException("No existe el pedido " + idPedido));
	    
	    pedido.setEstado("Terminado");
	    pedido.setTelefono(0); 
	    pedidorepository.save(pedido);
	}

	public List<Map<String, Object>> obtenerTodosLosPedidosGlobales() {
	    List<PedidoEntity> todos = pedidorepository.findAll();

	    return todos.stream().map(pedido -> {
	        Map<String, Object> map = new HashMap<>();
	        map.put("id", pedido.getId());
	        map.put("entrega", pedido.getEntrega() != null ? pedido.getEntrega().toString() : "Sin fecha");
	        map.put("estado", pedido.getEstado());
	        

	        map.put("nombre_cliente", pedido.getCliente() != null ? pedido.getCliente().getUsuario() : "Anónimo");
	        

	        map.put("telefono", (pedido.getTelefono() == 0 || "Terminado".equalsIgnoreCase(pedido.getEstado())) ? "Oculto" : pedido.getTelefono());
	        
	        map.put("preciototal", pedido.getPreciototal());


	        List<Integer> productosIds = pedido.getProductos().stream()
	            .map(pp -> pp.getProducto().getID_producto())
	            .collect(Collectors.toList());
	        map.put("productos", productosIds);
	        
	        return map;
	    }).collect(Collectors.toList());
	}




}
