# 🦅 Alas de Cristal - Plataforma de Comercio y Gestión Interna

¡Bienvenido al repositorio de **Alas de Cristal**! Este proyecto nace con el objetivo principal de digitalizar e impulsar una pequeña tienda de aves, facilitando la atracción de nuevos clientes, inspirando confianza y optimizando de forma integral toda su gestión operativa e interna.

---

## 📋 Características del Proyecto

El sistema está dividido estratégicamente en dos grandes áreas funcionales:

### 🏪 Canal de Comercio Electrónico (Público)
*   **Interfaz Intuitiva y Accesible:** Diseñada en React para ofrecer una navegación fluida, limpia y una experiencia de usuario óptima en la compra de productos.
*   **Secciones de Transparencia:** Integración de apartados clave como *"Quiénes Somos"* y *"Política de devoluciones"* para transmitir seguridad, profesionalismo y confianza desde el primer minuto.
*   **Catálogo Dinámico:** Sistema de gestión que permite visualizar, cargar, editar y eliminar productos de manera atractiva.

### ⚙️ Panel de Gestión Operativa (Interno para Staff)
*   **Control de Personal (Fichajes):** Módulo automatizado para el registro de jornadas laborales (entradas y salidas) de los empleados.
*   **Gestión de Empleados:** Funcionalidad avanzada para administradores que permite dar de alta (registrar) nuevos empleados y dar de baja (eliminar) miembros del personal.
*   **Administración Centralizada de Pedidos:** Optimización de las ventas y control de pedidos para reducir la carga operativa del propietario.

---

## 🛠️ Tecnologías y Metodología

*   **Frontend:** React / TypeScript (Garantizando escalabilidad, rendimiento y modularidad ante futuros aumentos de tráfico).
*   **Backend:** Java / Spring Boot.
*   **Base de Datos y Despliegue:** PostgreSQL y **Docker**.
*   **Metodología:** Desarrollo Ágil. El proyecto se ha construido de forma iterativa, permitiendo integrar módulos de manera flexible y escalable asegurando versiones funcionales en cada fase.

---

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para levantar el entorno completo de desarrollo local:

### 📦 Paso 1: Levantar el Servidor (Backend con Docker)
El servidor y la base de datos se despliegan automáticamente utilizando contenedores, aislando el entorno de base de datos y la API sin configuraciones manuales complejas.

1. Abre tu terminal y accede a la carpeta del **Backend** (donde se encuentra el archivo `docker-compose.yml`).
2. Levanta los servicios en segundo plano ejecutando:
```bash
   docker-compose up -d --build