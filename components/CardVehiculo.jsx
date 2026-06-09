import './CardVehiculo.css'

function CardVehiculo({ vehiculo, onEliminar }) {
  const cardClasses = `card-vehiculo ${vehiculo.permanente ? 'permanente' : 'temporal'}`
  
  return (
    <div className={cardClasses}>
      <div className="card-badge">
        {vehiculo.permanente ? 'Permanente' : 'Temporal'}
      </div>
      
      <div className="card-patente">
        {vehiculo.patente}
      </div>
      
      <div className="card-info">
        <div className="info-row">
          <span className="info-label">Propietario:</span>
          <span>{vehiculo.propietario}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Modelo:</span>
          <span>{vehiculo.modelo}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Ingreso:</span>
          <span>{vehiculo.fechaIngreso}</span>
        </div>
      </div>
      
      <button 
        className="btn-eliminar"
        onClick={() => onEliminar(vehiculo.patente)}
      >
        Eliminar
      </button>
    </div>
  )
}

export default CardVehiculo