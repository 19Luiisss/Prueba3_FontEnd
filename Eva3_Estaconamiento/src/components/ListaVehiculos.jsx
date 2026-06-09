import CardVehiculo from './CardVehiculo'
import './ListaVehiculos.css'

function ListaVehiculos({ vehiculos, onEliminarVehiculo }) {
  return (
    <div className="lista-vehiculos">
      <h2>Vehiculos Registrados ({vehiculos.length})</h2>
      <div className="cards-container">
        {vehiculos.map((vehiculo) => (
          <CardVehiculo 
            key={vehiculo.patente}
            vehiculo={vehiculo}
            onEliminar={onEliminarVehiculo}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaVehiculos