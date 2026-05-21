import { Link } from 'react-router-dom';
import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <h3>Alas de Cristal</h3>
                
                {/* NUEVO: Información de Contacto y Ubicación */}
                <div className="footer-contact-info">
                    <p>📍 <strong>Ubicación:</strong> N° 122343, Distrito Místico</p>
                    <p>📞 <strong>Teléfono:</strong> +34 600 123 456</p>
                    <p>✉️ <strong>Correo:</strong> info@alasdecristal.com</p>
                </div>

                <div className="footer-badge">
                    <a 
                        href="https://www.w3.org/WAI/WCAG2AAA-Conformance" 
                        title="Explanation of WCAG 2 Level AAA conformance"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img 
                            height="31" 
                            width="88" 
                            src="https://www.w3.org/WAI/WCAG22/wcag2.2AAA" 
                            alt="Level AAA conformance, W3C Web Content Accessibility Guidelines 2.2" 
                        />
                    </a>
                </div>
                <p className="footer-copy">&copy; 2026 Diseño de Interfaces Web | Luis Carlos Pérez Pérez</p>
            </div>

            <div className="footer-right">
                <h4>Términos y Servicios</h4>
                <ul>
                    <li><Link to="/ProductosyServicios">Productos y Servicios</Link></li>
                    <li><Link to="/CondicionesdeEntrega">Condiciones de Entrega</Link></li>
                    <li><Link to="/PoliticadeEntrega">Política de Entrega</Link></li>
                </ul>
            </div>

            <div className="footer-right">
                <h4>Accesibilidad y Cookies</h4>
                <ul>
                    <li><Link to="/Accesibilidad">Declaración de Accesibilidad</Link></li>
                    <li><Link to="/Cookies">Política de Cookies</Link></li>
                </ul>
            </div>

            {/* NUEVO: Bloque de Redes Sociales */}
            <div className="footer-right">
                <h4>Síguenos</h4>
                <ul className="social-links">
                    <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a></li>
                    <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">👥 Facebook</a></li>
                    <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">🐦 X (Twitter)</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;