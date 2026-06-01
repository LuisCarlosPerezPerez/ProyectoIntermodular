import React, { useState } from 'react';
import { usePedido } from './PedidoContext'; 
import ModalCheckout from '../componentes/ModalCheckout';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles/Carrito.css';

const CarritoView: React.FC = () => {
    const { carritoItems, cambiarCantidad, eliminarProducto, limpiarPedidoNuevo } = usePedido();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    
    const subtotalPrecio = carritoItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const gastosEnvio = subtotalPrecio > 50 || subtotalPrecio === 0 ? 0 : 4.99;
    const importeTotal = subtotalPrecio + gastosEnvio;

    const handlePagoCompletado = () => {
        limpiarPedidoNuevo(); 
        setIsCheckoutOpen(false);
    };

    return (
        <>
            <Header /> 
            
            <div className="cristal-carrito-page">
                <div className="cristal-carrito-layout">
                    
                    <section className="cristal-carrito-bloque">
                        <h2 className="cristal-carrito-titulo">Cesta de la Compra</h2>
                        
                        {carritoItems.length === 0 ? (
                            <div className="cristal-carrito-vacio">
                                <p className="cristal-carrito-vacio-texto">Tu cesta está vacía actualmente.</p>
                            </div>
                        ) : (
                            <div className="cristal-carrito-lista">
                                {carritoItems.map((item) => (
                                    <div className="cristal-carrito-item" key={item.id_producto}>
                                        <img 
                                            src={item.imagen ? `data:image/jpeg;base64,${item.imagen}` : 'https://via.placeholder.com/100'} 
                                            alt={item.nombre} 
                                            className="cristal-carrito-img"
                                        />
                                        
                                        <div className="cristal-carrito-info">
                                            <h3 className="cristal-carrito-articulo-nombre">{item.nombre}</h3>
                                            <div className="cristal-carrito-controles">
                                                <label className="cristal-carrito-label">Cantidad:</label>
                                                <select 
                                                    className="cristal-carrito-select"
                                                    value={item.cantidad}
                                                    onChange={(e) => cambiarCantidad(item.id_producto, parseInt(e.target.value))}
                                                >
                                                    {Array.from({ length: item.stock }, (_, i) => i + 1).map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                                
                                                <button 
                                                    className="cristal-carrito-btn-eliminar" 
                                                    onClick={() => eliminarProducto(item.id_producto)}
                                                    aria-label={`Eliminar ${item.nombre} del carrito`}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="cristal-carrito-precio-bloque">
                                            {(item.precio * item.cantidad).toFixed(2)}€
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="cristal-carrito-resumen">
                        <h3 className="cristal-resumen-titulo">Resumen del Pedido</h3>

                        <div className="cristal-resumen-fila">
                            <span>Subtotal</span> 
                            <strong>{subtotalPrecio.toFixed(2)}€</strong>
                        </div>
                        
                        <div className="cristal-resumen-fila">
                            <span>Gastos de envío</span> 
                            <span className={gastosEnvio === 0 ? "envio-gratis-tag" : ""}>
                                {gastosEnvio === 0 ? 'Gratis' : `${gastosEnvio.toFixed(2)}€`}
                            </span>
                        </div>
                        
                        <div className="cristal-resumen-fila total-destacado">
                            <span>Total</span> 
                            <span>{importeTotal.toFixed(2)}€</span>
                        </div>
                        
                        <button 
                            className="btn-tramitar-pedido-cristal"
                            disabled={carritoItems.length === 0}
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            Tramitar Pedido
                        </button>
                    </aside>

                </div>

                <ModalCheckout 
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    carritoItems={carritoItems}
                    total={importeTotal}
                    onPaymentSuccess={handlePagoCompletado}
                />
            </div>
            
            <Footer /> 
        </>
    );
};

export default CarritoView;