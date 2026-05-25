/**
 * DTO para el inicio de sesión del cliente.
 */
export interface SesionClienteDTO {
  usuario: string;
  contrasena: string; // Sin "ñ" para coincidir con tu entidad Java
}

/**
 * DTO para el formulario de registro del cliente.
 * Incluye los datos básicos de acceso y los datos de contacto/envío.
 */
export interface RegistroClienteDTO {
  usuario: string;
  contrasena: string;
  gmail: string;      // Usamos "gmail" como en tu @Column(name = "GMAIL")
  telefono: number;   // Añadido
  direccion: string;  // Añadido
}

/**
 * Modelo completo del cliente tal y como viene de la base de datos.
 * Útil para manejar el perfil y almacenar la sesión en el localStorage.
 */
export interface FullClienteDTO {
  id: number;
  usuario: string;
  contrasena: string;
  gmail: string;
  telefono: number;   // Añadido
  direccion: string;  // Añadido
  listapedidos: number[]; 
}