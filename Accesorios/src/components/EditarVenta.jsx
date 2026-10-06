import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditarVenta.css';

function EditarVenta({ venta, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    clientes_id: venta.clientes_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

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
    axios.put(`https://accesorios-backend.onrender.com/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate();
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <div className="editar-overlay" onClick={onClose}>
      <div className="editar-modal" onClick={e => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="editar-modal-header">
          <h3 className="editar-modal-titulo">✏️ Editar Venta</h3>
          <button className="editar-cerrar" onClick={onClose} aria-label="Cerrar">×</button>
        </div>

        {/* Formulario */}
        <form className="editar-form" onSubmit={handleSubmit}>
          <div className="editar-campo">
            <label htmlFor="edit-cliente">Cliente</label>
            <select id="edit-cliente" name="clientes_id" value={formData.clientes_id} onChange={handleChange} required>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} - {c.grupo}</option>
              ))}
            </select>
          </div>

          <div className="editar-campo">
            <label htmlFor="edit-producto">Producto</label>
            <select id="edit-producto" name="producto_id" value={formData.producto_id} onChange={handleChange} required>
              {productos.map(p => (
                <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
              ))}
            </select>
          </div>

          <div className="editar-campo">
            <label htmlFor="edit-cantidad">Cantidad</label>
            <input
              id="edit-cantidad"
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="editar-campo">
            <label htmlFor="edit-fecha">Fecha</label>
            <input
              id="edit-fecha"
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="editar-acciones">
            <button type="button" className="editar-btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="editar-btn-guardar">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarVenta;