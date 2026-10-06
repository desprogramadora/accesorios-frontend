import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarVenta from './EditarVenta';
import './ListaVentas.css';

// Imágenes de productos
import imgDiadema  from '../assets/diadema.jpg';
import imgAretes   from '../assets/aretes.jpg';
import imgPulsera  from '../assets/pulsera.jpg';
import imgCollar   from '../assets/collar.jpg';
import imgAnillo   from '../assets/anillo.jpg';

/**
 * Devuelve la imagen correcta buscando palabras clave
 * en el nombre del producto (no importa mayúsculas/minúsculas).
 */
function getProductoImagen(nombreProducto = '') {
  const n = nombreProducto.toLowerCase();
  if (n.includes('diadema') || n.includes('terciopelo') || n.includes('vincha')) return imgDiadema;
  if (n.includes('aret')    || n.includes('pendiente')  || n.includes('arete'))  return imgAretes;
  if (n.includes('pulser')  || n.includes('brazalete')  || n.includes('cristal')) return imgPulsera;
  if (n.includes('collar')  || n.includes('gargantill') || n.includes('cadena')) return imgCollar;
  if (n.includes('anillo')  || n.includes('ring')       || n.includes('sortij')) return imgAnillo;
  return null;
}

/* ─── Skeleton de una tarjeta ─────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="venta-card skeleton-card" aria-hidden="true">
      <div className="skeleton-imagen" />
      <div className="venta-card-body">
        <div className="skeleton-line skeleton-titulo" />
        <div className="skeleton-line skeleton-cliente" />
        <div className="venta-card-detalles skeleton-detalles">
          <div className="skeleton-bloque" />
          <div className="skeleton-bloque" />
          <div className="skeleton-bloque skeleton-bloque-total" />
        </div>
      </div>
      <div className="venta-card-acciones">
        <div className="skeleton-btn" />
        <div className="skeleton-btn" />
      </div>
    </div>
  );
}

/* ─── Componente principal ────────────────────────────────── */
function ListaVentas() {
  const [ventas, setVentas]                   = useState([]);
  const [cargando, setCargando]               = useState(true);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    setCargando(true);
    axios.get('https://accesorios-backend.onrender.com/ventas')
      .then(res => {
        setVentas(res.data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al obtener ventas:', err);
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      axios.delete(`https://accesorios-backend.onrender.com/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas();
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div className="lista-ventas-container">

      {/* Header */}
      <div className="lista-ventas-header">
        <h2 className="lista-ventas-titulo">Ventas de Accesorios</h2>
        <span className="lista-ventas-count">
          {cargando ? '...' : `${ventas.length} registros`}
        </span>
      </div>

      {/* ── Skeleton loading ── */}
      {cargando && (
        <div className="ventas-grid">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── Sin datos ── */}
      {!cargando && ventas.length === 0 && (
        <div className="lista-ventas-vacia">
          <span className="lista-ventas-vacia-icono">🛍️</span>
          <p>No hay ventas registradas aún</p>
        </div>
      )}

      {/* ── Grid de tarjetas reales ── */}
      {!cargando && ventas.length > 0 && (
        <div className="ventas-grid">
          {ventas.map(v => {
            const imagen = getProductoImagen(v.producto);
            return (
              <div className="venta-card" key={v.id}>

                {/* Zona imagen */}
                <div className="venta-card-imagen">
                  {imagen ? (
                    <img
                      src={imagen}
                      alt={v.producto}
                      className="venta-card-img"
                    />
                  ) : (
                    <span className="venta-card-emoji">💎</span>
                  )}
                  <span className="venta-card-fecha-badge">{v.fecha}</span>
                </div>

                {/* Contenido */}
                <div className="venta-card-body">
                  <h3 className="venta-card-producto">{v.producto}</h3>
                  <p className="venta-card-cliente">
                    <span className="venta-label">Cliente</span>
                    {v.cliente}
                  </p>

                  <div className="venta-card-detalles">
                    <div className="venta-detalle-item">
                      <span className="venta-label">Cantidad</span>
                      <span className="venta-valor">{v.cantidad}</span>
                    </div>
                    <div className="venta-detalle-item">
                      <span className="venta-label">Precio unit.</span>
                      <span className="venta-valor">${v.precio}</span>
                    </div>
                    <div className="venta-detalle-item venta-detalle-total">
                      <span className="venta-label">Total</span>
                      <span className="venta-total">${v.total}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="venta-card-acciones">
                  <button
                    className="btn-editar"
                    onClick={() => setVentaSeleccionada(v)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarVenta(v.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Modal editar */}
      {ventaSeleccionada && (
        <EditarVenta
          venta={ventaSeleccionada}
          onUpdate={() => { cargarVentas(); setVentaSeleccionada(null); }}
          onClose={() => setVentaSeleccionada(null)}
        />
      )}

    </div>
  );
}

export default ListaVentas;