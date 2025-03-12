import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMateriaStore = create(
    persist(
        (set) => ({
            apellido: '',
            dni: '',
            cursos: [],
            divisiones: [],
            materia:[],

            // Función para actualizar el estado con los datos de la API
            setMateriaData: (data) =>
                set((state) => ({
                    apellido: data.apellido,
                    dni: data.dni,
                    cursos: [...state.cursos, data.curso],
                    divisiones: [...state.divisiones, data.division],
                    materia: [...state.materia, data.materia]
                })),

            // Función para limpiar el estado (Logout)
            logout: () =>
                set(() => ({
                    apellido: '',
                    dni: '',
                    cursos: [],
                    divisiones: [],
                    materia:[]
                })),
        }),
        {
            name: 'materia-store', // Nombre de la clave en localStorage
            getStorage: () => localStorage, // Cambia a sessionStorage si prefieres
        }
    )
);

export default useMateriaStore;
