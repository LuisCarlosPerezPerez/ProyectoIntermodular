package com.example.demo.servicios.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.pedido.PedidoDTO;
import com.example.demo.dto.pedido.VerPedidoDTO;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.servicios.interfaz.InterfazPedido;

@Service
public class ImplementacionPedido implements InterfazPedido { 

    @Autowired
    private RepositorioCliente repositorioCliente;
    
    @Autowired
    private RepositorioPedido repositorioPedido;

    @Override
    public PedidoDTO CrearPedido() {
        return new PedidoDTO();
    }

    @Override
    public int guardarPedido(PedidoDTO dto) {
        PedidoEntity entidad = new PedidoEntity();
        
        // Buscamos el cliente y lo asignamos
        entidad.setCliente(repositorioCliente.BuscarPorId(dto.getId_cliente()));
        
        // Importante: inicializar campos básicos si vienen en el DTO
        entidad.setEstado("Comprando..."); 
        
        PedidoEntity guardado = repositorioPedido.save(entidad);
        return guardado.getId();
    }

    @Override
    public List<VerPedidoDTO> listarPedidos() {
        List<PedidoEntity> pedidos = repositorioPedido.findAll();
        return pedidos.stream()
                .map(a -> {
                    VerPedidoDTO vista = new VerPedidoDTO();
                    vista.setId(a.getId());
                    vista.setEstado(a.getEstado());
                    vista.setEntrega(a.getEntrega());
                    vista.setId_cliente(a.getCliente().getId());
                    // Obtenemos los IDs de los productos desde la tabla intermedia
                    vista.setProductos(a.getProductos().stream()
                        .map(pp -> pp.getProducto().getID_producto())
                        .collect(java.util.stream.Collectors.toSet()));
                    return vista;
                })
                .toList();
    }
}