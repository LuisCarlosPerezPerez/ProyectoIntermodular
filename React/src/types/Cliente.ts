export interface SesionClienteDTO {
  usuario: string;
  contraseña: string;
}

export interface RegistroClienteDTO {
  usuario: string;
  contraseña: string;
  email: string;
}


export interface FullClienteDTO {
  id: number;
  usuario: string;
  contraseña: string;
  email: string;
  listapedidos: number[]; 
}