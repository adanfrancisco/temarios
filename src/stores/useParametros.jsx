import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useParametros = create(persist( set => ({
  cursos: {
    curso1: {
      nombre: "Curso A",
      materia: "Matemáticas",
      docente: "Profesor García"
    }
  },
  actualizarCurso: (claveCurso, nuevosValores) =>
    set(state => ({
      cursos: {
        ...state.cursos,
        [claveCurso]: {
          ...state.cursos[claveCurso],
          ...nuevosValores
        }
      }
    })),
  eliminarCurso: claveCurso =>
    set(state => {
      const { [claveCurso]: _, ...nuevosCursos } = state.cursos;
      return { cursos: nuevosCursos };
    }),
  agregarCurso: (claveCurso, curso) =>
    set(state => ({
      cursos: {
        ...state.cursos,
        [claveCurso]: curso
      }
    }))
})));
export default  useParametros;
