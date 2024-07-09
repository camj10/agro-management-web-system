import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Edit_marca({ datosEdicion, onCancel, onSave }) {
  const [editedData, setEditedData] = useState({ descripcion: '' }); // Inicializar con valores por defecto

  useEffect(() => {
    console.log("datosEdicion: ",datosEdicion)
    if (datosEdicion && datosEdicion.length > 0) {
      setEditedData(datosEdicion[0]);
    } else {
      console.log("Está vacío datosEdicion: ", datosEdicion);
    }
  }, [datosEdicion]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="descripcion"><strong>Descripcion:</strong></label>
          <input
            type="text"
            placeholder='descripcion'
            name='descripcion'
            value={editedData.descripcion || ''}
            onChange={handleInputChange}
            className='form-control rounded-0'
            autoComplete='off'
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </>
  );
}

export default Edit_marca;
