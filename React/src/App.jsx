import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Autenticacion from './paginas/Autenticacion';
import Tienda from './paginas/Tienda'; 
import DetalleProducto from './paginas/DetalleProducto'; 

// 1. IMPORTAMOS LAS NUEVAS PÁGINAS DEL STAFF
import Fichar from './paginas/Fichar';   // Ajusta la ruta si las tienes en otra carpeta
import Pedidos from './paginas/Pedido'; // Ajusta la ruta si las tienes en otra carpeta
import AdministrarEmpleados from './paginas/AdministrarEmpleados';
import VerFichados from './paginas/VerFichados';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Página de Inicio */}
        <Route path="/" element={<Inicio />} />

        {/* Ruta de Login/Registro */}
        <Route path="/Autenticacion" element={<Autenticacion />} />

        {/* --- RUTAS DE LA TIENDA --- */}
        
        {/* Vista general de productos (incluye el Modal de añadir para el Staff) */}
        <Route path="/Tienda" element={<Tienda />} />

        {/* Vista de un producto específico (usa el ID dinámico) */}
        <Route path="/producto/:id" element={<DetalleProducto />} />

        {/* --- 2. NUEVAS RUTAS DEL PERSONAL (STAFF) --- */}
        
        {/* Control de turnos y jornada laboral */}
        <Route path="/Fichar" element={<Fichar />} />

        {/* Panel de control y gestión de compras */}
        <Route path="/Pedidos" element={<Pedidos />} />

        {/* Panel de administracion de los empleados */}
        <Route path="/AdministrarEmpleados" element={<AdministrarEmpleados />} />

        {/* Panel de Registro de los empleados */}
        <Route path="/Fichados" element={<VerFichados />} />
        
      </Routes>
    </Router>
  );
}

export default App;