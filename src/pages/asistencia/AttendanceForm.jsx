import { useState, useEffect } from 'react';
import { useAddAsistencia, useUpdateAsistencia, useFetchAlumnos } from './AttendanceApi';
import useAttendanceStore from './useAttendanceStore';
import useParametros from '../../stores/useParametros';

const AttendanceForm = () => {
    const materiaSeleccionada = useParametros((state) => state.cursos);
    const materiaNombre = materiaSeleccionada.curso1.nombre;

    const [alumno, setAlumno] = useState('');
    const [estado, setEstado] = useState('Presente');
    const [editando, setEditando] = useState(null);
    const { asistencias } = useAttendanceStore();
    const addMutation = useAddAsistencia();
    const updateMutation = useUpdateAsistencia();
    const { data: alumnos = [] } = useFetchAlumnos();

    useEffect(() => {
        console.log(alumnos)
        if (alumnos.length > 0) {
            setAlumno(alumnos[0]);
        }
        console.log(alumnos)
    }, [alumnos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaAsistencia = {
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            materiaNombre,
            alumno,
            estado
        };

        if (editando) {
            updateMutation.mutate({ id: editando, updatedAsistencia: nuevaAsistencia });
            setEditando(null);
        } else {
            addMutation.mutate(nuevaAsistencia);
        }
    };

    return (
        <div>
            <h2>CURSO: {materiaNombre}</h2>
            <form onSubmit={handleSubmit}>
                <select value={alumno} onChange={(e) => setAlumno(e.target.value)}>
                    <option value=''>Seleccionar alumno</option>
                    {alumnos.map((a, i) => (
                        <option key={i} value={a}>{a}</option>
                    ))}
                </select>

                <button type='button' className='btn btn-success' onClick={() => setEstado('Presente')}>P</button>
                <button type='button' className='btn btn-danger' onClick={() => setEstado('Ausente')}>A</button>
                <button type='button' className='btn btn-primary' onClick={() => setEstado('Tarde')}>T</button>

                <button type='submit'>{editando ? 'Actualizar' : 'Registrar'}</button>
            </form>
        </div>
    );
};

export default AttendanceForm;
