import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePersonStore = create(
  persist(
    (set) => ({
      apellido: '',
      nombres: '',
      email: '',
      dni: '',
      typeUser: '',
      id: '',

      // Función para actualizar el estado con los datos de la API
      setUserData: (data) =>
        set(() => ({
          apellido: data.apellido,
          nombres: data.nombres,
          email: data.email,
          dni: data.dni,
          typeUser: data.userType,
          id:data.id
        })),

      // Función para limpiar el estado (Logout)
      logout: () =>
        set(() => ({
          apellido: '',
          nombres: '',
          email: '',
          dni: '',
          typeUser: '',
          id:'',
        })),
    }),
    {
      name: 'person-store', // Nombre de la clave en localStorage
      getStorage: () => localStorage, // Cambia a sessionStorage si prefieres
    }
  )
);

export default usePersonStore;
