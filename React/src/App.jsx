import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        {/* Esta ruta indica que al cargar la web (/) se vea tu página de Inicio */}
        <Route path="/" element={<Inicio />} />
        
        {/* Aquí añadirás más adelante: 
        <Route path="/Tienda" element={<Tienda />} /> 
        */}
      </Routes>
    </Router>
  );
}

export default App;