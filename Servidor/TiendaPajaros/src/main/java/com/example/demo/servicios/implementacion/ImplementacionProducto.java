package com.example.demo.servicios.implementacion;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.producto.*;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.repository.RepositorioProducto;
import com.example.demo.servicios.interfaz.InterfazProducto;

@Service
public class ImplementacionProducto implements InterfazProducto {

    @Autowired
    private RepositorioProducto repoProducto;

    @Override
    public List<VerProductoDTO> listarProductos() {
        return repoProducto.findAll().stream()
                .map(p -> new VerProductoDTO(
                        p.getID_producto(),
                        p.getNombre(),
                        p.getDescripcion(), 
                        p.getStock(),
                        p.getPrecio(),
                        new ArrayList<>()   
                ))
                .toList();
    }

    @Override
    @Transactional
    public int GuardarProducto(NuevoProductoDTO productoDTO) {
        ProductoEntity existente = repoProducto.findByNombre(productoDTO.getNombre());
        
        if (existente == null) {
            ProductoEntity nuevaEntidad = new ProductoEntity();
            nuevaEntidad.setNombre(productoDTO.getNombre());
            nuevaEntidad.setPrecio(productoDTO.getPrecio());
            nuevaEntidad.setDescripcion(productoDTO.getDescripcion());
            nuevaEntidad.setStock(productoDTO.getStock());
            
            ProductoEntity guardado = repoProducto.save(nuevaEntidad);
            return guardado.getID_producto();
        }
        
        return 0; 
    }

    @Override
    @Transactional
    public void actualizarProducto(int id, NuevoProductoDTO productoDTO) {
        repoProducto.actualizarProducto(
            id, 
            productoDTO.getNombre(), 
            productoDTO.getPrecio(), 
            productoDTO.getStock(), 
            productoDTO.getDescripcion() 
        );
    }

    @Override
    public void eliminarProducto(int idProducto) {
        repoProducto.deleteById(idProducto);
    }

    @Override
    public NuevoProductoDTO crearProductos() {
        return new NuevoProductoDTO();
    }
}