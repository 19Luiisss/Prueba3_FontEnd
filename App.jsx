import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListaVehiculos from './components/ListaVehiculos'
import './App.css'

function App() {
  const [vehiculos, setVehiculos] = useState([])
  const CAPACIDAD_TOTAL = 10
  const cuposDisponibles = CAPACIDAD_TOTAL - vehiculos.length

  useEffect(() => {
    const vehiculosGuardados = localStorage.getItem('vehiculos')
    if (vehiculosGuardados) {
      setVehiculos(JSON.parse(vehiculosGuardados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos))
  }, [vehiculos])

  const agregarVehiculo = (nuevoVehiculo) => {
    if (vehiculos.length >= CAPACIDAD_TOTAL) {
      alert('No hay cupos disponibles')
      return false
    }
    setVehiculos([...vehiculos, nuevoVehiculo])
    return true
  }

  const eliminarVehiculo = (patente) => {
    setVehiculos(vehiculos.filter(vehiculo => vehiculo.patente !== patente))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">P</span>
            <h1>Sistema de Gestión de Estacionamientos</h1>
          </div>
          <div className="estado-cupos">
            <span className={`cupos ${cuposDisponibles === 0 ? 'lleno' : cuposDisponibles <= 3 ? 'poco' : ''}`}>
              Cupos disponibles: {cuposDisponibles} / {CAPACIDAD_TOTAL}
            </span>
          </div>
        </div>
      </header>

      <main className="main">
        <Formulario onAgregarVehiculo={agregarVehiculo} />
        {vehiculos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">V</span>
            <p>No hay vehiculos registrados</p>
            <small>Complete el formulario para agregar un vehiculo</small>
          </div>
        ) : (
          <ListaVehiculos 
            vehiculos={vehiculos} 
            onEliminarVehiculo={eliminarVehiculo}
          />
        )}
      </main>

      <footer className="footer">
        <p>2024 - Sistema de Gestión de Estacionamientos</p>
        <p>Contacto: +56 2 1234 5678 | info@parking.cl</p>
        <p className="footer-credits">Desarrollado para Programacion </p>
      </footer>
    </div>
  )
}

export default App