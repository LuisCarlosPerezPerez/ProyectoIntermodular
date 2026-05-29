package com.example.demo.servicios.implementacion;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest; // 👈 Asegúrate de tener este import para paginar
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
		dto.setCategoria(entidad.getCategoria()); 
		dto.setStock(entidad.getStock());
		dto.setVendidos(entidad.getVendidos()); 
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
					dto.setCategoria(p.getCategoria()); 
					dto.setStock(p.getStock());
					dto.setVendidos(p.getVendidos()); 
					dto.setPrecio(p.getPrecio());
					List<String> imagenesBase64 = p.getImagenes().stream()
							.map(img -> Base64.getEncoder().encodeToString(img.getContenidoImagen()))
							.toList();
					
					dto.setContenidoImagenes(imagenesBase64);
					return dto;
				})
				.toList();
	}

	@Override
	public List<VerProductoDTO> listarProductosMasVendidos() {
		return repoProducto.findTopVendidos(PageRequest.of(0, 3)).stream()
				.map(p -> {
					VerProductoDTO dto = new VerProductoDTO();
					dto.setId_producto(p.getID_producto());
					dto.setNombre(p.getNombre());
					dto.setDescripcion(p.getDescripcion());
					dto.setCategoria(p.getCategoria());
					dto.setStock(p.getStock());
					dto.setVendidos(p.getVendidos()); 
					dto.setPrecio(p.getPrecio());

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
			nuevaEntidad.setCategoria(productoDTO.getCategoria()); 
			nuevaEntidad.setStock(productoDTO.getStock());
			nuevaEntidad.setVendidos(0); 
			
			ProductoEntity guardado = repoProducto.save(nuevaEntidad);

			if (productoDTO.getContenidoImagenes() != null) {
				for (String base64Str : productoDTO.getContenidoImagenes()) {
					try {
						byte[] imageBytes = Base64.getDecoder().decode(base64Str);
						ProductoImagenEntity img = new ProductoImagenEntity();
						img.setContenidoImagen(imageBytes);
						img.setProducto(guardado);
						repoImagen.save(img);
					} catch (IllegalArgumentException e) {
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
			p.setCategoria(productoDTO.getCategoria()); 
			
			repoProducto.save(p);

			if (productoDTO.getContenidoImagenes() != null && !productoDTO.getContenidoImagenes().isEmpty()) {
				
			repoImagen.deleteByProducto(p); 
				
				for (String base64Str : productoDTO.getContenidoImagenes()) {
					try {
						byte[] imageBytes = Base64.getDecoder().decode(base64Str);
						
						ProductoImagenEntity img = new ProductoImagenEntity();
						img.setContenidoImagen(imageBytes);
						img.setProducto(p); 
						repoImagen.save(img);
					} catch (IllegalArgumentException e) {
						System.err.println("Error decodificando nueva imagen en edición: " + e.getMessage());
					}
				}
			}
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