// import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import useParametros from '../../stores/useParametros';
import ClaseCRUD from './ClaseCRUD';

const Materia = () => {
    const materiaSeleccionada = useParametros((state) => state.cursos);
    const materiaNombre=materiaSeleccionada.curso1.nombre;

  return (
    <>
        <NavBar />

        {materiaSeleccionada && <ClaseCRUD materiaSeleccionada={materiaNombre} />}
        {/* <br /><br />
        {Object.entries(materiaSeleccionada).map(([clave, materiaSeleccionada]) => (
            <div key={clave}>
        <h1>{materiaSeleccionada.nombre}</h1>
        </div>

      ))} */}
    </>
  )
}

export default Materia