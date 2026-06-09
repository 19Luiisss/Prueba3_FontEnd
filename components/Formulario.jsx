import { useState } from 'react'
import './Formulario.css'

function Formulario({ onAgregarVehiculo }) {
  const [formData, setFormData] = useState({
    patente: '',
    propietario: '',
    modelo: '',
    permanente: false
  })
  const [errores, setErrores] = useState({})

  const validarPatente = (patente) => {
    const regexPatente = /^[A-Za-z]{4}\d{2}$/
    return regexPatente.test(patente.toUpperCase())
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = {}
    
    if (!formData.patente.trim()) {
      nuevosErrores.patente = 'La patente es obligatoria'
    } else if (!validarPatente(formData.patente)) {
      nuevosErrores.patente = 'Formato invalido. Ejemplo: ABCD12 (4 letras y 2 numeros)'
    }
    
    if (!formData.propietario.trim()) {
      nuevosErrores.propietario = 'El nombre del propietario es obligatorio'
    }
    
    if (!formData.modelo.trim()) {
      nuevosErrores.modelo = 'El modelo del vehiculo es obligatorio'
    }
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    
    const nuevoVehiculo = {
      patente: formData.patente.toUpperCase(),
      propietario: formData.propietario,
      modelo: formData.modelo,
      permanente: formData.permanente,
      fechaIngreso: new Date().toLocaleString()
    }
    
    const exito = onAgregarVehiculo(nuevoVehiculo)
    
    if (exito) {
      setFormData({
        patente: '',
        propietario: '',
        modelo: '',
        permanente: false
      })
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Registrar Nuevo Vehiculo</h2>
      
      <div className="form-group">
        <label htmlFor="patente">
          Patente <span className="required">*</span>
        </label>
        <input
          type="text"
          id="patente"
          name="patente"
          value={formData.patente}
          onChange={handleChange}
          placeholder="Ej: ABCD12"
          className={errores.patente ? 'error' : ''}
        />
        <small className="form-hint">Formato: 4 letras y 2 numeros (ej: ABCD12)</small>
        {errores.patente && <span className="error-message">{errores.patente}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="propietario">
          Propietario <span className="required">*</span>
        </label>
        <input
          type="text"
          id="propietario"
          name="propietario"
          value={formData.propietario}
          onChange={handleChange}
          placeholder="Nombre completo"
          className={errores.propietario ? 'error' : ''}
        />
        {errores.propietario && <span className="error-message">{errores.propietario}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="modelo">
          Modelo <span className="required">*</span>
        </label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          placeholder="Ej: Toyota Corolla"
          className={errores.modelo ? 'error' : ''}
        />
        {errores.modelo && <span className="error-message">{errores.modelo}</span>}
      </div>
      
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="permanente"
            checked={formData.permanente}
            onChange={handleChange}
          />
          <span>Cliente Permanente</span>
        </label>
      </div>
      
      <button type="submit" className="btn-submit">
        Registrar Vehiculo
      </button>
    </form>
  )
}

export default Formulario