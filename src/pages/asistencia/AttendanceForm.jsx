import { useState } from 'react';
import { useAddAsistencia, useFetchAlumnos } from './AttendanceApi';
import useAttendanceStore from './useAttendanceStore';
import useParametros from '../../stores/useParametros';

const AttendanceForm = () => {
    const materiaSeleccionada = useParametros((state) => state.cursos);
    const materiaNombre=materiaSeleccionada.curso1.nombre;

    const [alumno, setAlumno] = useState('');
    const [estado, setEstado] = useState('Presente');
    const { asistencias } = useAttendanceStore();
    const mutation = useAddAsistencia();

console.log(materiaNombre)

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaAsistencia = {
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            materiaNombre,
            alumno,
            estado
        };
        mutation.mutate(nuevaAsistencia);
    };

    return (
        <div>
            <h2>CURSO: {materiaNombre}</h2>
            <form onSubmit={handleSubmit}>

                <select value={alumno} onChange={(e) => setAlumno(e.target.value)}>
                    <option value=''>Seleccionar alumno</option>
                    {asistencias.map((a, i) => (
                        <option key={i} value={a.alumno}>{a.alumno}</option>
                    ))}
                </select>

                    <button className='btn btn-success ' value='Presente'>P</button>
                    <button className='btn btn-danger ' value='Ausente'>A</button>
                    <button className='btn btn-primary ' value='Tarde'>T</button>

                <button type='submit'>Registrar</button>
            </form>
        </div>
    );
};

export default AttendanceForm;