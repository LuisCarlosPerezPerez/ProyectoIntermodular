import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PedidoProvider } from './paginas/PedidoContext'; 

import Inicio from './paginas/Inicio';
import Autenticacion from './paginas/Autenticacion';
import Tienda from './paginas/Tienda'; 
import DetalleProducto from './paginas/DetalleProducto'; 
import CarritoView from './paginas/CarritoView';


import Fichar from './paginas/Fichar';   
import Pedidos from './paginas/Pedido'; 
import AdministrarEmpleados from './paginas/AdministrarEmpleados';
import VerFichados from './paginas/VerFichados';


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

          <Route path="/" element={<Inicio />} />

          <Route path="/Autenticacion" element={<Autenticacion />} />

          <Route path="/Tienda" element={<Tienda />} />

          <Route path="/producto/:id" element={<DetalleProducto />} />

          <Route path="/Fichar" element={<Fichar />} />

          <Route path="/Pedidos" element={<Pedidos />} />

          <Route path="/AdministrarEmpleados" element={<AdministrarEmpleados />} />

          <Route path="/Fichados" element={<VerFichados />} />

          <Route path="/Carrito" element={<CarritoView />} />

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