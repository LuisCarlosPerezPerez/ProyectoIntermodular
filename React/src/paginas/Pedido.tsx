import React, { useEffect, useState } from 'react';
import { pedidoService } from '../Services/PedidoServicio'; 
import type { VerPedidoDTO } from '../types/Pedido';
import Header from './Header';
import Footer from './Footer';
import '../styles/Pedido.css';

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<VerPedidoDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await pedidoService.listarTodos();
      setPedidos(datos);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la lista de pedidos.');
    } finally {
      setCargando(false);
    }
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await pedidoService.actualizarEstado(id, nuevoEstado);
      
      // Actualizamos el estado de forma reactiva localmente
      setPedidos(prevPedidos => 
        prevPedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p)
      );
    } catch (err: any) {
      alert(err.message || 'No se pudo actualizar el estado del pedido.');
      cargarPedidos(); 
    }
  };

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtroEstado === 'Todos') return true;
    return p.estado?.toLowerCase() === filtroEstado.toLowerCase();
  });

  const totalPendientes = pedidos.filter(p => p.estado?.toLowerCase() === 'pendiente').length;
  const totalEnviados = pedidos.filter(p => p.estado?.toLowerCase() === 'enviado').length;

  return (
    <>
      <Header />
      <div className="pedidos-page">
        <main className="container pedidos-container">
          
          {/* DASHBOARD HEADER */}
          <div className="pedidos-dashboard-header">
            <h2>Panel de Gestión de Pedidos</h2>
            <p>Control, seguimiento y actualización de compras de Alas de Cristal.</p>
          </div>

          {/* TARJETAS DE MÉTRICAS */}
          <div className="pedidos-metrics-grid">
            <div className="metric-card total">
              <h3>{pedidos.length}</h3>
              <p>Pedidos Totales</p>
            </div>
            <div className="metric-card pendientes">
              <h3>{totalPendientes}</h3>
              <p>Pendientes</p>
            </div>
            <div className="metric-card enviados">
              <h3>{totalEnviados}</h3>
              <p>Enviados</p>
            </div>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="pedidos-filter-bar">
            <label htmlFor="filtro-estado">Filtrar por estado:</label>
            <select 
              id="filtro-estado" 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="form-select-custom"
            >
              <option value="Todos">📦 Mostrar Todos</option>
              <option value="Pendiente">⏳ Pendientes</option>
              <option value="Enviado">🚚 Enviados</option>
              <option value="Cancelado">❌ Cancelados</option>
            </select>
          </div>

          {/* TABLA PRINCIPAL */}
          <div className="pedidos-table-wrapper">
            {cargando ? (
              <div className="pedidos-loader">Consultando registros en el archivo místico...</div>
            ) : error ? (
              <div className="pedidos-error-msg">{error}</div>
            ) : pedidosFiltrados.length === 0 ? (
              <div className="pedidos-vacio">No se encontraron pedidos con el estado seleccionado.</div>
            ) : (
              <div className="tabla-responsiva">
                <table className="tabla-pedidos">
                  <thead>
                    <tr>
                      <th>ID Pedido</th>
                      <th>ID Cliente</th>
                      <th>Dirección Entrega</th>
                      <th>Nº Productos</th>
                      <th>Estado Actual</th>
                      <th>Acciones / Gestionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosFiltrados.map((pedido) => (
                      <tr key={pedido.id}>
                        <td className="pedido-id-text">#{pedido.id}</td>
                        <td>
                          <span className="cliente-id-badge">👤 {pedido.id_cliente}</span>
                        </td>
                        <td className="entrega-text">
                          {pedido.entrega || 'Recogida en tienda'}
                        </td>
                        <td>
                          {/* Muestra la cantidad de artículos sumando la longitud del array de IDs */}
                          <span className="productos-count">
                            📦 {pedido.productos ? pedido.productos.length : 0} ud(s).
                          </span>
                        </td>
                        <td>
                          <span className={`badge-estado ${pedido.estado?.toLowerCase() || 'pendiente'}`}>
                            {pedido.estado}
                          </span>
                        </td>
                        <td>
                          <select
                            value={pedido.estado || 'Pendiente'}
                            onChange={(e) => handleCambiarEstado(pedido.id, e.target.value)}
                            className={`select-actions ${pedido.estado?.toLowerCase() || 'pendiente'}`}
                          >
                            <option value="Pendiente">⏳ Marcar Pendiente</option>
                            <option value="Enviado">🚚 Marcar Enviado</option>
                            <option value="Cancelado">❌ Marcar Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>
      <Footer />
    </>
  );
};

export default Pedidos;