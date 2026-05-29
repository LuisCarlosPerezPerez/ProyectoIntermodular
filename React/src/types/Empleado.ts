export interface NuevoEmpleadoDTO {
  usuario: string;
  contraseña: string;
}

export interface VerEmpleadoDTO {
  ID_Empleado: number;
  Usuario: string;
  Contraseña: string;
  Administrador: number; 
}

export interface FullEmpleadoDTO {
  ID_Empleado: number;
  Usuario: string;
  Contraseña: string;
  Administrador: number;
  registros: number[]; 
  productos: number[]; 
}