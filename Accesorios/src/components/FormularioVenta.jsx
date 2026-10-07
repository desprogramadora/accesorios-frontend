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
  const [clientes,  setClientes]  = useState([]);
  const [productos, setProductos] = useState([]);
  const [enviando,  setEnviando]  = useState(false);
  const [exito,     setExito]     = useState(false);

  useEffect(() => {
    axios.get('https://accesorios-backend.onrender.com/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));

    axios.get('https://accesorios-backend.onrender.com/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    axios.post('https://accesorios-backend.onrender.com/ventas', formData)
      .then(() => {
        setEnviando(false);
        setExito(true);
        setFormData({ clientes_id: '', producto_id: '', cantidad: '', fecha: '' });
        setTimeout(() => setExito(false), 3000);
      })
      .catch(err => {
        console.error('Error al registrar venta:', err);
        setEnviando(false);
      });
  };

  return (
    <div className="fv-wrapper">

      {/* ── Banner decorativo superior ── */}
      <div className="fv-banner">
        <span className="fv-banner-icono">💎</span>
        <div>
          <h2 className="fv-titulo">Nueva Venta</h2>
          <p className="fv-subtitulo">Completa los datos para registrar</p>
        </div>
      </div>

      {/* ── Toast de éxito ── */}
      {exito && (
        <div className="fv-toast" role="alert">
          <span className="fv-toast-icono">✅</span>
          ¡Venta registrada con éxito!
        </div>
      )}

      {/* ── Formulario ── */}
      <form className="fv-form" onSubmit={handleSubmit} noValidate>

        {/* Fila 1: Cliente + Producto (2 columnas) */}
        <div className="fv-fila-doble">

          <div className="fv-campo">
            <label htmlFor="fv-cliente">
              <span className="fv-campo-icono">👤</span> Cliente
            </label>
            <div className="fv-input-wrap">
              <select
                id="fv-cliente"
                name="clientes_id"
                value={formData.clientes_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre} — {c.grupo}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="fv-campo">
            <label htmlFor="fv-producto">
              <span className="fv-campo-icono">🛍️</span> Producto
            </label>
            <div className="fv-input-wrap">
              <select
                id="fv-producto"
                name="producto_id"
                value={formData.producto_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona producto</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre} — ${p.precio}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Fila 2: Cantidad + Fecha (2 columnas) */}
        <div className="fv-fila-doble">

          <div className="fv-campo">
            <label htmlFor="fv-cantidad">
              <span className="fv-campo-icono">🔢</span> Cantidad
            </label>
            <div className="fv-input-wrap">
              <input
                id="fv-cantidad"
                type="number"
                name="cantidad"
                placeholder="Ej. 2"
                value={formData.cantidad}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          <div className="fv-campo">
            <label htmlFor="fv-fecha">
              <span className="fv-campo-icono">📅</span> Fecha
            </label>
            <div className="fv-input-wrap">
              <input
                id="fv-fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          className={`fv-btn-submit ${enviando ? 'fv-btn-loading' : ''}`}
          disabled={enviando}
        >
          {enviando
            ? <><span className="fv-spinner" /> Registrando...</>
            : '✦ Registrar Venta'
          }
        </button>

      </form>
    </div>
  );
}

export default FormularioVenta;