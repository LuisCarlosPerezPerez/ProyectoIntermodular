import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Autenticacion from './paginas/Autenticacion';
// Importa tus otras páginas aquí

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Página de Inicio */}
        <Route path="/" element={<Inicio />} />

        {/* Ruta de Login/Registro */}
        <Route path="/Autenticacion" element={<Autenticacion />} />

        {/* Ejemplo de otras rutas que podrías tener */}
        {/* <Route path="/Tienda" element={<Tienda />} /> */}
      </Routes>
    </Router>
  );
}

export default App;