import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import axios from "axios";
const API_URL=import.meta.env.VITE_BACK_LOGIN;

const useFechasStore = create((set) => ({
  dia: "martes",
  inicio: "2025-03-17",
  fin: "2025-07-30",
  setDia: (dia) => set({ dia }),
  setInicio: (inicio) => set({ inicio }),
  setFin: (fin) => set({ fin }),
}));

const fetchFechas = async ({ queryKey }) => {
  const [, dia, inicio, fin] = queryKey;
  const { data } = await axios.get(`${API_URL}/fechas`, {
    params: { dia, inicio, fin },
  });
  return data.fechas;
};

export default function FechasApp() {
  const { dia, inicio, fin, setDia, setInicio, setFin } = useFechasStore();
  const { data: fechas, isLoading, error } = useQuery({
    queryKey: ["fechas", dia, inicio, fin],
    queryFn: fetchFechas,
    enabled: !!dia && !!inicio && !!fin,
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Buscar Fechas por Día</h1>
      <div className="flex flex-col gap-2">
        <select
          className="p-2 border rounded"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        >
          {["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input
          type="date"
          className="p-2 border rounded"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          />
        <input
          type="date"
          className="p-2 border rounded"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          />
          <br />
         <button>VOLVER</button>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500">Error al obtener datos</p>}
        {fechas && (
          <ul className="mt-4 p-2 border rounded">
            {fechas.map((fecha) => (
              <li key={fecha}>{fecha}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}