package com.example.demo.servicios.implementacion;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.registro.*;
import com.example.demo.entity.RegistroEntity;
import com.example.demo.repository.RepositorioRegistro;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.servicios.interfaz.InterfazRegistro;

@Service
public class ImplementacionRegistro implements InterfazRegistro {
	
	@Autowired
	RepositorioRegistro registrosql;
	
	@Autowired
	RepositorioEmpleado empleadosql;

	@Override
	public NuevoRegistroDTO crearRegistro() {
		return new NuevoRegistroDTO();
	}
	
	@Override
    public int GuardarRegistro(NuevoRegistroDTO registro) {
        RegistroEntity registrar = new RegistroEntity();
        registrar.setFecha(registro.getFecha());
        registrar.setFecha_entrada(registro.getFecha_entrada());
        registrar.setTotal_horas(0);
        
        registrar.setEmpleado(empleadosql.findById(registro.getId_empleado()));
        
        RegistroEntity r = registrosql.save(registrar);
        return r.getID_Registro();
    }

	@Override
	public void RegistrarSalida(int idEmpleado) {

	    RegistroEntity registro = registrosql.buscarRegistroAbierto(idEmpleado);
	    
	    if (registro != null) {
	        int idReg = registro.getID_Registro(); 

	        registrosql.ActualizarHoraSalida(LocalDateTime.now(), idReg);
	        

	        Double horas = registrosql.calcularHorasPorId(idReg);
	        

	        if (horas != null) {
	            registrosql.ActualizarHorasTotales(horas, idReg);
	        }
	    }
	}

    @Override
    public List<RegistroDTO> listarRegistros() {

        return registrosql.findAll().stream()
            .map(a -> new RegistroDTO(
                a.getID_Registro(),
                a.getFecha(),
                a.getFecha_entrada(),
                a.getFecha_salida(),
                a.getTotal_horas(),
                a.getEmpleado().getID_Empleado() 
            ))
            .toList();
    }

    @Override
    public List<RegistroDTO> listarTodosLosRegistros() {

        List<RegistroEntity> listaCompleta = registrosql.listarTodosLosRegistros();
        
        return listaCompleta.stream()
            .map(a -> new RegistroDTO(
                a.getID_Registro(),
                a.getFecha(),
                a.getFecha_entrada(),
                a.getFecha_salida(),
                a.getTotal_horas(),
                a.getEmpleado() != null ? a.getEmpleado().getID_Empleado() : 0
            ))
            .collect(Collectors.toList());
    }
    
    

}
