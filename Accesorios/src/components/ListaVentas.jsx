import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarVenta from './EditarVenta';
import './ListaVentas.css';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    axios.get('http://localhost:3000/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      axios.delete(`http://localhost:3000/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas();
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div className="lista-ventas-container">
      <h2 className="lista-ventas-titulo">Ventas de Accesorios</h2>
      <table className="lista-ventas-tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.cliente}</td>
              <td>{v.producto}</td>
              <td>{v.cantidad}</td>
              <td>${v.precio}</td>
              <td>${v.total}</td>
              <td>{v.fecha}</td>
              <td>
                <button onClick={() => setVentaSeleccionada(v)}>Editar</button>
                <button onClick={() => eliminarVenta(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventaSeleccionada && (
        <EditarVenta venta={ventaSeleccionada} onUpdate={cargarVentas} />
      )}
    </div>
  );
}

export default ListaVentas;