export interface SesionClienteDTO {
  usuario: string;
  contrasena: string; 
}

export interface RegistroClienteDTO {
  usuario: string;
  contrasena: string;
  gmail: string;      
  telefono: number;   
  direccion: string;  
}

export interface FullClienteDTO {
  id: number;
  usuario: string;
  contrasena: string;
  gmail: string;
  telefono: number;   
  direccion: string;  
  listapedidos: number[]; 
}