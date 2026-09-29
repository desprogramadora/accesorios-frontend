import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    clientes_id: venta.clientes_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3000/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate(); // refresca la lista de ventas
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="clientes_id" value={formData.clientes_id} onChange={handleChange} required>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.nombre} - {c.grupo}</option>
        ))}
      </select>

      <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
        {productos.map(p => (
          <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
        ))}
      </select>

      <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <button type="submit">Actualizar Venta</button>
    </form>
  );
}

export default EditarVenta;