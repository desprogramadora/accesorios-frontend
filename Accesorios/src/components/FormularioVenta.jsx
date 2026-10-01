import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormularioVenta.css';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    clientes_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar listas de clientes y productos al iniciar
  useEffect(() => {
    axios.get('https://accesorios-backend.onrender.com/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));

    axios.get('https://accesorios-backend.onrender.com/productos')
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
    axios.post('https://accesorios-backend.onrender.com/ventas', formData)
      .then(res => {
        alert(res.data.message);
        setFormData({ clientes_id: '', producto_id: '', cantidad: '', fecha: '' });
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <select name="clientes_id" value={formData.clientes_id} onChange={handleChange} required>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre} - {c.grupo}</option>
          ))}
        </select>

        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccione producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>

        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;