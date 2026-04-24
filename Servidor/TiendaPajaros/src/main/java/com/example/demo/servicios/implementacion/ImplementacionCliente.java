package com.example.demo.servicios.implementacion;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.clientedto.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.servicios.interfaz.*;

@Service
public class ImplementacionCliente implements InterfazCliente {

	@Autowired
	private RepositorioCliente clienteRepository;
	@Autowired
	private RepositorioPedido pedidoRepository;
	@Autowired
	private RepositorioProducto productoRepository;
	@Autowired
	private RepositorioProductoPedido relacionRepository;

	@Override
	public RegistroClienteDTO RegistroCliente() {
		return new RegistroClienteDTO();
	}

	public int guardarcliente(RegistroClienteDTO cliente) {
		ClienteEntity clienteentity = null;
		ClienteEntity entidad = new ClienteEntity();
		entidad.setContrasena(cliente.getContraseña());
		entidad.setUsuario(cliente.getUsuario());
		clienteentity = clienteRepository.save(entidad);
		return clienteentity.getId();
	}

	@Override
	public FullClienteDTO ComprobarSesion(String usuario, String contraseña) {
		FullClienteDTO cliente = null;
		ClienteEntity clienteentity = clienteRepository.BuscarPorUsuarioYContraseña(usuario, contraseña);
		List<Integer> listapedidos = rellenarlistapedidos(clienteentity.getPedido());
		cliente = new FullClienteDTO(clienteentity.getId(), clienteentity.getUsuario(), clienteentity.getContrasena(),
				clienteentity.getGmail(), listapedidos);
		return cliente;
	}

	public List<Integer> rellenarlistapedidos(List<PedidoEntity> listaentidades) {
		List<Integer> listapedidos = new ArrayList<>();
		if (!(listaentidades == null)) {
			for (int i = 0; i < listaentidades.size(); i++) {
				listapedidos.add(listaentidades.get(i).getId());
			}
		}
		return listapedidos;
	}
	@Override
	public FullClienteDTO comprarproducto(FullClienteDTO clienteDto, int idProducto) {

	    ClienteEntity cliente = clienteRepository.findById(clienteDto.getId())
	            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
	    
	    ProductoEntity producto = productoRepository.findById(idProducto)
	            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

	    if (producto.getStock() <= 0) {
	        throw new RuntimeException("Sin stock para: " + producto.getNombre());
	    }


	    PedidoEntity pedidoActivo = cliente.getPedido().stream()
	            .filter(p -> "Comprando...".equalsIgnoreCase(p.getEstado()))
	            .findFirst()
	            .orElse(null);

	    if (pedidoActivo == null) {
	        pedidoActivo = new PedidoEntity();
	        pedidoActivo.setEntrega(new java.sql.Date(System.currentTimeMillis()));
	        pedidoActivo.setEstado("Comprando...");
	        pedidoActivo.setCliente(cliente);
	        pedidoActivo = pedidoRepository.save(pedidoActivo);
	        cliente.getPedido().add(pedidoActivo); 
	        System.out.println("DEBUG: Creado nuevo pedido pendiente ID: " + pedidoActivo.getId());
	    }

	    final PedidoEntity pedidoFinal = pedidoActivo; 
	    PedidoProductoEntity relacionExistente = relacionRepository.findAll().stream()
	            .filter(rp -> rp.getPedido().getId() == pedidoFinal.getId() && 
	                          rp.getProducto().getID_producto() == producto.getID_producto())
	            .findFirst()
	            .orElse(null);

	    if (relacionExistente != null) {

	        System.out.println("DEBUG: El producto ya existe en el pedido. Incrementando cantidad.");
	        relacionExistente.setCantidad(relacionExistente.getCantidad() + 1);
	        relacionRepository.save(relacionExistente);
	    } else {

	        System.out.println("DEBUG: Primera vez que se añade este producto al pedido.");
	        PedidoProductoEntity nuevaRelacion = new PedidoProductoEntity();
	        nuevaRelacion.setPedido(pedidoActivo);
	        nuevaRelacion.setProducto(producto);
	        nuevaRelacion.setCantidad(1);
	        relacionRepository.save(nuevaRelacion);
	    }

	    // 5. Restar Stock global del producto
	    producto.setStock(producto.getStock() - 1);
	    productoRepository.save(producto);

	    // 6. RECONSTRUIR TOKEN (DTO)
	    List<Integer> idsActualizados = cliente.getPedido().stream()
	                                    .map(PedidoEntity::getId)
	                                    .collect(Collectors.toList());

	    return new FullClienteDTO(
	        cliente.getId(),
	        cliente.getUsuario(),
	        cliente.getContrasena(),
	        cliente.getGmail(),
	        idsActualizados
	    );
	}

	@Override
	public FullClienteDTO finalizarPedidoAutomatico(String fechaEntrega, String telefono, Map<String, Object> payload) {
	    
	
	    Map<String, Object> clienteToken = (Map<String, Object>) payload.get("clienteToken");
	    if (clienteToken == null || clienteToken.get("id") == null) {
	        throw new RuntimeException("Token de cliente inválido o nulo");
	    }
	    int idCliente = ((Number) clienteToken.get("id")).intValue();

	    List<Map<String, Object>> productosFront = (List<Map<String, Object>>) payload.get("productosActualizados");
	    if (productosFront == null) {
	        throw new RuntimeException("La lista de productos está vacía");
	    }

	    ClienteEntity cliente = clienteRepository.findById(idCliente)
	            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

	    PedidoEntity pedido = cliente.getPedido().stream()
	            .filter(p -> "Comprando...".equalsIgnoreCase(p.getEstado()))
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("No hay pedido pendiente para este cliente"));

	    int acumuladorTotal = 0;

	    for (Map<String, Object> pFront : productosFront) {

	        Object idObj = pFront.get("id_producto");
	        if (idObj == null) {
	            throw new RuntimeException("Error: Se recibió un producto sin 'id_producto'");
	        }
	        int idProd = ((Number) idObj).intValue();
	        
	        int cantConfirmada = ((Number) pFront.get("cantidad")).intValue();


	        PedidoProductoEntity relacion = pedido.getProductos().stream()
	                .filter(pp -> pp.getProducto().getID_producto() == idProd)
	                .findFirst()
	                .orElseThrow(() -> new RuntimeException("El producto con ID " + idProd + " no pertenece a este pedido"));


	        ProductoEntity productoDB = relacion.getProducto();
	        int stockActual = productoDB.getStock();

	        if (stockActual < cantConfirmada) {
	            throw new RuntimeException("Stock insuficiente para: " + productoDB.getNombre() + " (Disponible: " + stockActual + ")");
	        }


	        int nuevoStock = stockActual - cantConfirmada;
	        productoDB.setStock(nuevoStock);
	        
	        System.out.println("📉 STOCK ACTUALIZADO: " + productoDB.getNombre() + " | Nuevo Stock: " + nuevoStock);

	        productoRepository.save(productoDB);


	        relacion.setCantidad(cantConfirmada);
	        acumuladorTotal += (productoDB.getPrecio() * cantConfirmada);
	    }


	    pedido.setPreciototal(acumuladorTotal); 
	    pedido.setEstado("Realizando...");
	    pedido.setTelefono(Integer.parseInt(telefono));
	    pedido.setEntrega(java.sql.Date.valueOf(fechaEntrega));

	    pedidoRepository.save(pedido);


	    List<Integer> idsPendientes = cliente.getPedido().stream()
	            .filter(p -> !"Finalizado".equals(p.getEstado()))
	            .map(PedidoEntity::getId)
	            .collect(Collectors.toList());

	    return new FullClienteDTO(cliente.getId(), cliente.getUsuario(), null, cliente.getGmail(), idsPendientes);
	}
	
	@Override
	public List<Map<String, Object>> obtenerProductosPedidoPendiente(int idCliente) {
	    ClienteEntity cliente = clienteRepository.findById(idCliente)
	            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

	    PedidoEntity pedidoPendiente = cliente.getPedido().stream()
	            .filter(p -> "Comprando...".equalsIgnoreCase(p.getEstado()))
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("No hay pedido pendiente"));

	    return pedidoPendiente.getProductos().stream()
	            .map(pp -> {
	                Map<String, Object> pMap = new HashMap<>();
	                // Coincidimos con tu interface: id_producto, nombre, stock, precio, etc.
	                pMap.put("id_producto", pp.getProducto().getID_producto());
	                pMap.put("nombre", pp.getProducto().getNombre());
	                pMap.put("stock", pp.getProducto().getStock());
	                pMap.put("precio", pp.getProducto().getPrecio());
	                pMap.put("receta", pp.getProducto().getReceta());
	                pMap.put("cantidad", pp.getCantidad()); // Campo extra para el carrito
	                
	                // Mapeo del objeto empleado si existe
	                if (pp.getProducto().getEmpleado() != null) {
	                    Map<String, Object> empMap = new HashMap<>();
	                    empMap.put("id_empleado", pp.getProducto().getEmpleado().getID_Empleado());
	                    pMap.put("empleado", empMap);
	                }
	                
	                return pMap;
	            })
	            .collect(Collectors.toList());
	}
	
	@Override
	public List<Map<String, Object>> obtenerHistorialPedidos(int idCliente) {
	    ClienteEntity cliente = clienteRepository.findById(idCliente)
	            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

	    return cliente.getPedido().stream()
	            .map(pedido -> {
	                Map<String, Object> map = new HashMap<>();
	                map.put("id", pedido.getId());
	                map.put("entrega", pedido.getEntrega() != null ? pedido.getEntrega().toString() : "Sin fecha");
	                map.put("telefono", pedido.getTelefono());
	                
	                // Lógica de estados solicitada
	                String estadoDB = pedido.getEstado();
	                if ("terminado".equalsIgnoreCase(estadoDB) || "Realizando...".equalsIgnoreCase(estadoDB)) {
	                    map.put("estado", "Realizando...");
	                } else {
	                    map.put("estado", "Comprando...");
	                }
	                
	                map.put("preciototal", pedido.getPreciototal());

	                List<Map<String, Object>> productosLista = pedido.getProductos().stream()
	                        .map(pp -> {
	                            Map<String, Object> pMap = new HashMap<>();
	                            pMap.put("id_producto", pp.getProducto().getID_producto());
	                            return pMap;
	                        })
	                        .collect(Collectors.toList());
	                
	                map.put("productos", productosLista);
	                map.put("id_cliente", cliente.getId());
	                
	                return map;
	            })
	            .collect(Collectors.toList());
	}


}
