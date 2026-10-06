import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <span className="app-logo">💎</span>
          <h1 className="app-titulo">Accesorios</h1>
          <span className="app-subtitulo">Gestión de Ventas</span>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="app-main">
        <FormularioVenta />
        <ListaVentas />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2025 Accesorios — Sistema de Ventas</p>
      </footer>
    </div>
  );
}

export default App;