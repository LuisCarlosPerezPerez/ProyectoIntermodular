import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PedidoProvider } from './paginas/PedidoContext'; 

import Inicio from './paginas/Inicio';
import Autenticacion from './paginas/Autenticacion';
import Tienda from './paginas/Tienda'; 
import DetalleProducto from './paginas/DetalleProducto'; 
import CarritoView from './paginas/CarritoView';

// IMPORTAMOS LAS NUEVAS PÁGINAS DEL STAFF
import Fichar from './paginas/Fichar';   
import Pedidos from './paginas/Pedido'; 
import AdministrarEmpleados from './paginas/AdministrarEmpleados';
import VerFichados from './paginas/VerFichados';

// 🦜 1. IMPORTAMOS LAS NUEVAS PÁGINAS INFORMATIVAS Y DE CONTACTO
import Contacto from './paginas/Contacto';
import ProductosServicios from './paginas/ProductosServicios';
import CondicionesEntrega from './paginas/CondicionesEntrega';
import PoliticaDevolucion from './paginas/PoliticaDevolucion';
import PoliticaCookies from './paginas/PoliticaCookies';
import DeclaracionAccesibilidad from './paginas/DeclaracionAccesibilidad';
import QuienesSomos from './paginas/QuienesSomos';

function App() {
  return (
    <PedidoProvider>
      <Router>
        <Routes>
          {/* Ruta principal: Página de Inicio */}
          <Route path="/" element={<Inicio />} />

          {/* Ruta de Login/Registro */}
          <Route path="/Autenticacion" element={<Autenticacion />} />

          {/* --- RUTAS DE LA TIENDA --- */}
          
          {/* Vista general de productos */}
          <Route path="/Tienda" element={<Tienda />} />

          {/* Vista de un producto específico */}
          <Route path="/producto/:id" element={<DetalleProducto />} />

          {/* --- RUTAS DEL PERSONAL (STAFF) --- */}
          
          {/* Control de turnos y jornada laboral */}
          <Route path="/Fichar" element={<Fichar />} />

          {/* Panel de control y gestión de compras */}
          <Route path="/Pedidos" element={<Pedidos />} />

          {/* Panel de administración de los empleados */}
          <Route path="/AdministrarEmpleados" element={<AdministrarEmpleados />} />

          {/* Panel de Registro de los empleados */}
          <Route path="/Fichados" element={<VerFichados />} />

          {/* Carrito de los Clientes */}
          <Route path="/Carrito" element={<CarritoView />} />

          {/* 🦜 2. DEFINIMOS LAS NUEVAS RUTAS DE USUARIO E INFORMATIVAS */}
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/ProductosServicios" element={<ProductosServicios />} />
          <Route path="/CondicionesEntrega" element={<CondicionesEntrega />} />
          <Route path="/PoliticaDevolucion" element={<PoliticaDevolucion />} />
          <Route path="/PoliticaCookies" element={<PoliticaCookies />} />
          <Route path="/DeclaracionAccesibilidad" element={<DeclaracionAccesibilidad />} />
          <Route path="/QuienesSomos" element={<QuienesSomos />} />
        </Routes>
      </Router>
    </PedidoProvider> 
  );
}

export default App;