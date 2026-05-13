package com.example.demo.servicios.implementacion;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

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
    public VerProductoDTO obtenerProductoPorId(int id) {
        ProductoEntity entidad = repoProducto.findById(id).orElse(null);
        
        if (entidad == null) return null;

        VerProductoDTO dto = new VerProductoDTO();
        dto.setId_producto(entidad.getID_producto());
        dto.setNombre(entidad.getNombre());
        dto.setPrecio(entidad.getPrecio());
        dto.setDescripcion(entidad.getDescripcion());
        dto.setStock(entidad.getStock());
        
        // Convertimos los bytes de la BD a String Base64 para el Frontend
        dto.setContenidoImagenes(
            entidad.getImagenes().stream()
                .map(img -> Base64.getEncoder().encodeToString(img.getContenidoImagen()))
                .collect(Collectors.toList())
        );
        
        return dto;
    }
    
    @Override
    public List<VerProductoDTO> listarProductos() {
        return repoProducto.findAll().stream()
                .map(p -> {
                    VerProductoDTO dto = new VerProductoDTO();
                    dto.setId_producto(p.getID_producto());
                    dto.setNombre(p.getNombre());
                    dto.setDescripcion(p.getDescripcion());
                    dto.setStock(p.getStock());
                    dto.setPrecio(p.getPrecio());
                    
                    // IMPORTANTE: El Frontend espera Strings en Base64 para mostrar las imágenes
                    List<String> imagenesBase64 = p.getImagenes().stream()
                            .map(img -> Base64.getEncoder().encodeToString(img.getContenidoImagen()))
                            .toList();
                    
                    dto.setContenidoImagenes(imagenesBase64);
                    return dto;
                })
                .toList();
    }

    @Override
    @Transactional
    public int GuardarProducto(NuevoProductoDTO productoDTO) {
        if (repoProducto.findByNombre(productoDTO.getNombre()) == null) {
            ProductoEntity nuevaEntidad = new ProductoEntity();
            nuevaEntidad.setNombre(productoDTO.getNombre());
            nuevaEntidad.setPrecio(productoDTO.getPrecio());
            nuevaEntidad.setDescripcion(productoDTO.getDescripcion());
            nuevaEntidad.setStock(productoDTO.getStock());
            
            ProductoEntity guardado = repoProducto.save(nuevaEntidad);

            if (productoDTO.getContenidoImagenes() != null) {
                for (String base64Str : productoDTO.getContenidoImagenes()) {
                    try {
                        // DECODIFICACIÓN: Pasamos de String (Frontend) a byte[] (Base de datos)
                        byte[] imageBytes = Base64.getDecoder().decode(base64Str);
                        
                        ProductoImagenEntity img = new ProductoImagenEntity();
                        img.setContenidoImagen(imageBytes);
                        img.setProducto(guardado);
                        repoImagen.save(img);
                    } catch (IllegalArgumentException e) {
                        // Opcional: manejar si el base64 viene corrupto
                        System.err.println("Error decodificando imagen: " + e.getMessage());
                    }
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
            
            // Si quieres actualizar imágenes aquí, deberías borrar las anteriores 
            // y decodificar las nuevas igual que en GuardarProducto.
            
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