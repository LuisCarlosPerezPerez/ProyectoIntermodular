package com.example.demo.dto.registro;

import java.time.LocalDateTime;
import java.util.Date;



public class RegistroDTO {
    private int ID_Registro;
    private Date fecha;
    private LocalDateTime fecha_entrada;
    private LocalDateTime fecha_salida;
    private Double total_horas;
    private int id_empleado;
    
	public RegistroDTO(int iD_Registro, Date fecha, LocalDateTime fecha_entrada, LocalDateTime fecha_salida, Double total_horas,
			int id_empleado) {
		super();
		this.ID_Registro = iD_Registro;
		this.fecha = fecha;
		this.fecha_entrada = fecha_entrada;
		this.fecha_salida = fecha_salida;
		this.total_horas = total_horas;
		this.id_empleado = id_empleado;
	}
	public RegistroDTO() {
		
	}
	public int getID_Registro() {
		return ID_Registro;
	}
	public void setID_Registro(int iD_Registro) {
		ID_Registro = iD_Registro;
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
	public void setFecha_entrada( LocalDateTime fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}
	public LocalDateTime getFecha_salida() {
		return fecha_salida;
	}
	public void setFecha_salida(LocalDateTime fecha_salida) {
		this.fecha_salida = fecha_salida;
	}
	public Double getTotal_horas() {
		return total_horas;
	}
	public void setTotal_horas(Double total_horas) {
		this.total_horas = total_horas;
	}
	public int getEmpleado() {
		return id_empleado;
	}
	public void setEmpleado(int id_empleado) {
		this.id_empleado = id_empleado;
	}

    
}
