import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUrls = create(devtools(
    persist(
    (set) => ({
      url_api: '',
      setUrl: (data) =>
        set(() => ({
          url_api: data.url_api
        })),

      usetUrl: () =>
        set(() => ({
          url_api: ''
        })),
    }),
    {
      name: 'url_api', // Nombre de la clave en localStorage
      getStorage: () => sessionStorage, // Cambia a sessionStorage si prefieres
    }
  ))
);

export default useUrls;
