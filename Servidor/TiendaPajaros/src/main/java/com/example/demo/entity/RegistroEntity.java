package com.example.demo.entity;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import jakarta.persistence.*;

@Entity
@Table(name ="Registro")
public class RegistroEntity implements Serializable {

	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_REGISTRO")
    private int ID_Registro;
    
    @Column(name ="FECHA")
    private Date fecha;
    
    @Column(name="FECHA_ENTRADA")
    private LocalDateTime fecha_entrada;
    
    @Column(name="FECHA_SALIDA")
    private LocalDateTime fecha_salida;
    
    @Column(name="TOTAL_HORAS")
    private Double total_horas;
    
    @ManyToOne
    @JoinColumn(name = "ID_EMPLEADO", nullable = false)
    private EmpleadoEntity empleado;

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

	public void setFecha_entrada(LocalDateTime fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}

	public LocalDateTime getFecha_salida() {
		return fecha_salida;
	}

	public void setFecha_salida(LocalDateTime fecha_salida) {
		this.fecha_salida = fecha_salida;
	}

	public double getTotal_horas() {
		return total_horas;
	}

	public void setTotal_horas(double total_horas) {
		this.total_horas = total_horas;
	}

	public EmpleadoEntity getEmpleado() {
		return empleado;
	}

	public void setEmpleado(EmpleadoEntity optional) {
		this.empleado = optional;
	}
	
}
