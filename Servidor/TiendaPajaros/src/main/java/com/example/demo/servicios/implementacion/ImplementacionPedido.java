package com.example.demo.servicios.implementacion;

import java.util.List;
import java.util.ArrayList;
import java.sql.Date;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.pedido.PedidoDTO;
import com.example.demo.dto.pedido.VerPedidoDTO;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.entity.PedidoProductoEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.repository.RepositorioProducto;
import com.example.demo.repository.RepositorioProductoPedido; 
import com.example.demo.servicios.interfaz.InterfazPedido;

@Service
public class ImplementacionPedido implements InterfazPedido { 

    @Autowired
    private RepositorioCliente repositorioCliente;
    
    @Autowired
    private RepositorioPedido repositorioPedido;

    @Autowired
    private RepositorioProducto repositorioProducto;

    @Autowired
    private RepositorioProductoPedido repositorioPedidoProducto; 

    @Override
    public PedidoDTO CrearPedido() {
        return new PedidoDTO();
    }

    @Override
    @Transactional 
    public int guardarPedido(PedidoDTO dto) {
        if (dto.getId_cliente() == null) {
            throw new RuntimeException("Error: El ID del cliente es obligatorio.");
        }
        if (dto.getTelefono() == null) {
            throw new RuntimeException("Error: El teléfono es obligatorio.");
        }
        if (dto.getPrecioTotal() == null) {
            throw new RuntimeException("Error: El precio total no puede estar vacío.");
        }

        System.out.println("DEBUG: Iniciando guardado de pedido para cliente: " + dto.getId_cliente());

        PedidoEntity entidad = new PedidoEntity();
        entidad.setCliente(repositorioCliente.BuscarPorId(dto.getId_cliente()));
        entidad.setDireccion(dto.getDireccion()); 
        entidad.setEstado("Pendiente"); 
        entidad.setTelefono(dto.getTelefono());
        entidad.setEntrega(Date.valueOf(LocalDate.now().plusDays(3))); 
        entidad.setPreciototal(dto.getPrecioTotal()); 
        
        PedidoEntity pedidoGuardado = repositorioPedido.save(entidad);
        
        if (dto.getProductos() != null && dto.getCantidades() != null) {
            List<Integer> listaIds = new ArrayList<>(dto.getProductos());
            List<Integer> listaCantidades = dto.getCantidades();
            
            for (int i = 0; i < listaIds.size(); i++) {
                int idProducto = listaIds.get(i);
                int cantidadComprada = listaCantidades.get(i);

                ProductoEntity producto = repositorioProducto.findById(idProducto)
                    .orElseThrow(() -> new RuntimeException("Producto con ID " + idProducto + " no existe"));

                if (producto.getStock() < cantidadComprada) {
                    throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
                }

                producto.setStock(producto.getStock() - cantidadComprada);
                producto.setVendidos(producto.getVendidos() + cantidadComprada);
                repositorioProducto.save(producto);
                PedidoProductoEntity relacion = new PedidoProductoEntity();
                relacion.setPedido(pedidoGuardado);
                relacion.setProducto(producto);
                relacion.setCantidad(cantidadComprada);
                repositorioPedidoProducto.save(relacion);
            }
        } else {
            throw new RuntimeException("Error: La lista de productos o cantidades no puede estar vacía.");
        }
        
        return pedidoGuardado.getId();
    }

    @Override
    public List<VerPedidoDTO> listarPedidos() {
        return repositorioPedido.findAll().stream().map(a -> {
            VerPedidoDTO vista = new VerPedidoDTO();
            vista.setId(a.getId());
            vista.setEstado(a.getEstado());
            vista.setEntrega(a.getEntrega());
            vista.setId_cliente(a.getCliente().getId());
            vista.setDireccion(a.getDireccion()); 
            vista.setProductos(a.getProductos().stream()
                .map(pp -> pp.getProducto().getID_producto())
                .collect(java.util.stream.Collectors.toSet()));
            return vista;
        }).toList();
    }

    @Override
    @Transactional
    public void actualizarEstado(int id, String nuevoEstado) {
        PedidoEntity pedido = repositorioPedido.findById(id)
            .orElseThrow(() -> new RuntimeException("El pedido con ID " + id + " no existe."));
        pedido.setEstado(nuevoEstado);
        repositorioPedido.save(pedido);
        
        System.out.println("DEBUG: Estado modificado en la BD con éxito para pedido #" + id);
    }
}