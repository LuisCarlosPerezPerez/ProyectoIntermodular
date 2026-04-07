package com.example.demo.dto.registro;

import java.time.LocalDateTime;
import java.util.Date;

public class NuevoRegistroDTO {
	
	private Date fecha;
    private LocalDateTime fecha_entrada;
    private int id_empleado;
    
	public NuevoRegistroDTO() {

	}
	
	public NuevoRegistroDTO(Date fecha, LocalDateTime fecha_entrada, int id_empleado) {
		super();
		this.fecha = fecha;
		this.fecha_entrada = fecha_entrada;
		this.id_empleado = id_empleado;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public LocalDateTime getFecha_entrada() {
		return fecha_entrada;
	}

	public void setFecha_entrada(LocalDateTime fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}

	public int getId_empleado() {
		return id_empleado;
	}

	public void setId_empleado(int id_empleado) {
		this.id_empleado = id_empleado;
	}
    
    

}
