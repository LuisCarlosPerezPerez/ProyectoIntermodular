package com.example.demo.servicios.implementacion;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.producto.*;
import com.example.demo.entity.ProductoEntity;
import com.example.demo.entity.ProductoImagenEntity;
import com.example.demo.repository.RepositorioProducto;
import com.example.demo.repository.RepositorioProductoImagen;
import com.example.demo.servicios.interfaz.InterfazProducto;

@Service
public class ImplementacionProducto implements InterfazProducto {

    @Autowired
    private RepositorioProducto repoProducto;
    
    @Autowired
    private RepositorioProductoImagen repoImagen;

    @Override
    public List<VerProductoDTO> listarProductos() {
        return repoProducto.findAll().stream()
                .map(p -> {
                    List<byte[]> listaBytes = p.getImagenes().stream()
                            .map(ProductoImagenEntity::getContenidoImagen)
                            .toList();

                    return new VerProductoDTO(
                            p.getID_producto(),
                            p.getNombre(),
                            p.getDescripcion(), 
                            p.getStock(),
                            p.getPrecio(),
                            listaBytes, // Ahora el DTO recibe la lista de bytes corregida
                            new ArrayList<>()   
                    );
                })
                .toList();
    }

    @Override
    @Transactional
    public int GuardarProducto(NuevoProductoDTO productoDTO) {
        // Verificamos si ya existe
        if (repoProducto.findByNombre(productoDTO.getNombre()) == null) {
            ProductoEntity nuevaEntidad = new ProductoEntity();
            nuevaEntidad.setNombre(productoDTO.getNombre());
            nuevaEntidad.setPrecio(productoDTO.getPrecio());
            nuevaEntidad.setDescripcion(productoDTO.getDescripcion());
            nuevaEntidad.setStock(productoDTO.getStock());
            
            // 1. Guardamos el producto para generar su ID
            ProductoEntity guardado = repoProducto.save(nuevaEntidad);

            // 2. Si el DTO trae imágenes, las vinculamos y guardamos
            if (productoDTO.getContenidoImagenes() != null) {
                for (byte[] bytes : productoDTO.getContenidoImagenes()) {
                    ProductoImagenEntity img = new ProductoImagenEntity();
                    img.setContenidoImagen(bytes);
                    img.setProducto(guardado); // Crucial: vincula la imagen al producto
                    repoImagen.save(img);
                }
            }
            return guardado.getID_producto();
        }
        return 0; 
    }

    @Override
    @Transactional
    public void actualizarProducto(int id, NuevoProductoDTO productoDTO) {
        repoProducto.findById(id).ifPresent(p -> {
            p.setNombre(productoDTO.getNombre());
            p.setPrecio(productoDTO.getPrecio());
            p.setStock(productoDTO.getStock());
            p.setDescripcion(productoDTO.getDescripcion());
            repoProducto.save(p);
        });
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