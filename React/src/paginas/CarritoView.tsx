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
            
            <div className="carrito-page-container">
                <div className="carrito-lista-productos">
                    <h2>Cesta de la Compra</h2>
                    
                    {carritoItems.length === 0 ? (
                        <div className="carrito-vacio">
                            <h3>Tu cesta está vacía.</h3>
                        </div>
                    ) : (
                        carritoItems.map((item) => (
                            <div className="item-carrito" key={item.id_producto}>
                                <img 
                                    src={item.imagen ? `data:image/jpeg;base64,${item.imagen}` : 'https://via.placeholder.com/100'} 
                                    alt={item.nombre} 
                                    className="img-item-carrito"
                                />
                                <div className="info-item-carrito">
                                    <h3>{item.nombre}</h3>
                                    <div className="controles-item-carrito">
                                        <label>Cantidad:</label>

                                        <select 
                                            className="select-cantidad-carrito"
                                            value={item.cantidad}
                                            onChange={(e) => cambiarCantidad(item.id_producto, parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: item.stock }, (_, i) => i + 1).map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                        <button className="btn-eliminar-item" onClick={() => eliminarProducto(item.id_producto)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                                <div className="precio-total-item">
                                    {(item.precio * item.cantidad).toFixed(2)}€
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="carrito-resumen-compra">
                    <h3>Resumen</h3>

                    <div className="resumen-fila">
                        <span>Subtotal:</span> 
                        <span>{subtotalPrecio.toFixed(2)}€</span>
                    </div>
                    <div className="resumen-fila">
                        <span>Gastos de envío:</span> 
                        <span>{gastosEnvio === 0 ? 'Gratis' : `${gastosEnvio.toFixed(2)}€`}</span>
                    </div>
                    <div className="resumen-fila total">
                        <span>Total:</span> 
                        <span>{importeTotal.toFixed(2)}€</span>
                    </div>
                    
                    <button 
                        className="btn-proceder-pedido"
                        disabled={carritoItems.length === 0}
                        onClick={() => setIsCheckoutOpen(true)}
                    >
                        Tramitar Pedido
                    </button>
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