import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id_producto: number;
    nombre: string;
    precio: number;
    stock: number;
    cantidad: number;
    imagen?: string;
}

interface PedidoContextType {
    carritoItems: CartItem[];
    agregarProducto: (producto: CartItem) => void;
    cambiarCantidad: (id_producto: number, nuevaCantidad: number) => void;
    eliminarProducto: (id_producto: number) => void;
    limpiarPedidoNuevo: () => void;
}

const PedidoContext = createContext<PedidoContextType>({
    carritoItems: [],
    agregarProducto: () => {},
    cambiarCantidad: () => {},
    eliminarProducto: () => {},
    limpiarPedidoNuevo: () => {}
});

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carritoItems, setCarritoItems] = useState<CartItem[]>([]);

    useEffect(() => {
        window.dispatchEvent(new Event('carritoActualizado'));
    }, [carritoItems]);

    const agregarProducto = (producto: CartItem) => {
        setCarritoItems(prev => {
            const existe = prev.find(item => item.id_producto === producto.id_producto);
            if (existe) {
                return prev.map(item => 
                    item.id_producto === producto.id_producto 
                        ? { ...item, cantidad: Math.min(item.cantidad + producto.cantidad, item.stock) } 
                        : item
                );
            }
            return [...prev, producto];
        });
    };

    const cambiarCantidad = (id_producto: number, nuevaCantidad: number) => {
        setCarritoItems(prev => 
            prev.map(item => item.id_producto === id_producto ? { ...item, cantidad: nuevaCantidad } : item)
        );
    };

    const eliminarProducto = (id_producto: number) => {
        setCarritoItems(prev => prev.filter(item => item.id_producto !== id_producto));
    };

    const limpiarPedidoNuevo = () => {
        setCarritoItems([]); 
    };

    return (
        <PedidoContext.Provider value={{ carritoItems, agregarProducto, cambiarCantidad, eliminarProducto, limpiarPedidoNuevo }}>
            {children}
        </PedidoContext.Provider>
    );
};

export const usePedido = () => useContext(PedidoContext);