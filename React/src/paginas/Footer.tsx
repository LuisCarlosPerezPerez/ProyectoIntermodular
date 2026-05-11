import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Importamos tu CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <h3>Alas de Cristal</h3>
            </div>

            <div className="footer-right">
                <h4>Términos y Servicios</h4>
                <ul>
                    <li><Link to="/ProductosyServicios">Productos y Servicios</Link></li>
                    <li><Link to="/CondicionesdeEntrega">Condiciones de Entrega</Link></li>
                    <li><Link to="/PoliticadeEntrega">Política de Entrega</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;