package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.RegistroEntity;
import jakarta.transaction.Transactional;

public interface RepositorioRegistro extends JpaRepository<RegistroEntity, Integer> {


    @Query(value = "SELECT * FROM REGISTRO WHERE ID_EMPLEADO = :ID_EMPLEADO AND FECHA_SALIDA IS NULL ORDER BY ID_REGISTRO DESC LIMIT 1", nativeQuery = true)
    RegistroEntity buscarRegistroAbierto(@Param("ID_EMPLEADO") int ID_EMPLEADO);

    @Modifying
    @Transactional
    @Query(value = "UPDATE REGISTRO SET FECHA_SALIDA = :FECHA_SALIDA WHERE ID_REGISTRO = :ID_REGISTRO", nativeQuery = true)
    void ActualizarHoraSalida(@Param("FECHA_SALIDA") LocalDateTime FECHA_SALIDA, @Param("ID_REGISTRO") int ID_REGISTRO);

    @Query(value = "SELECT TIMESTAMPDIFF(SECOND, FECHA_ENTRADA, FECHA_SALIDA) / 3600.0 FROM REGISTRO WHERE ID_REGISTRO = :ID_REGISTRO", nativeQuery = true)
    Double calcularHorasPorId(@Param("ID_REGISTRO") int ID_REGISTRO);

    @Modifying
    @Transactional
    @Query(value = "UPDATE REGISTRO SET TOTAL_HORAS = :Horas WHERE ID_REGISTRO = :ID_REGISTRO", nativeQuery = true)
    void ActualizarHorasTotales(@Param("Horas") Double Horas, @Param("ID_REGISTRO") int ID_REGISTRO);

    @Query(value = "SELECT * FROM REGISTRO WHERE ID_EMPLEADO = :ID_EMPLEADO", nativeQuery = true)
    List<RegistroEntity> listarRegistros(@Param("ID_EMPLEADO") int ID_EMPLEADO);
    
    @Query(value = "SELECT * FROM REGISTRO", nativeQuery = true)
    List<RegistroEntity> listarTodosLosRegistros();
}
