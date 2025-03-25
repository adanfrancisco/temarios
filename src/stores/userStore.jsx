import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
const URL_SCRIPTS=import.meta.env.VITE_URL_SCRIPTS;

const usePersonStore = create(devtools(
  persist(
    (set) => ({
      apellido: '',
      nombres: '',
      email: '',
      dni: '',
      typeUser: '',
      curso:'',

      // Función para actualizar el estado con los datos de la API
      setUserData: (data) =>
        set(() => ({
          apellido: data.apellido,
          nombres: data.nombres,
          email: data.email,
          dni: data.dni,
          typeUser: data.userType,
          url_api:URL_SCRIPTS
        })),

      // Función para limpiar el estado (Logout)
      logout: () =>
        set(() => ({
          apellido: '',
          nombres: '',
          email: '',
          dni: '',
          typeUser: '',
        })),
    }),
    {
      name: 'person-store', // Nombre de la clave en localStorage
      getStorage: () => localStorage, // Cambia a sessionStorage si prefieres
    }
  ))
);

export default usePersonStore;
