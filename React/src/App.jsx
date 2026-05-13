import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Autenticacion from './paginas/Autenticacion';
import Tienda from './paginas/Tienda'; 
import DetalleProducto from './paginas/DetalleProducto'; 

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
        
      </Routes>
    </Router>
  );
}

export default App;