import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const API_URL = import.meta.env.VITE_BACK_LOGIN;

const useAusenciasStore = create((set) => ({
  ausencias: [],
  setAusencias: (data) => set({ ausencias: data }),
}));

const fetchAusencias = async () => {
  const { data } = await axios.get(`${API_URL}/ausentes`);
  console.log(data);
  return data;
};

export default function Ausencias() {

    const navigate= useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ausencias"],
    queryFn: fetchAusencias,
  });

  const { setAusencias, ausencias } = useAusenciasStore();

  // Actualizar Zustand solo cuando los datos cambien
  useEffect(() => {
    if (data) {
      setAusencias(data);
    }
  }, [data, setAusencias]);

  if (isLoading) return <p>Cargando ausencias...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  const handleVolver =()=>{
    navigate('/docentes')
  }
  return (
    <div className="p-4">
        <Button onClick={() => handleVolver()} variant="contained" color="primary">
        VOLVER
      </Button>
      <h2 className="text-xl font-bold mb-4">Lista de Ausencias</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Hora</th>
            <th className="border p-2">DNI</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Nombres</th>
            <th className="border p-2">Motivo</th>
          </tr>
        </thead>
        <tbody>
          {ausencias.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{item.fecha}</td>
              <td className="border p-2">{item.hora}</td>
              <td className="border p-2">{item.dni}</td>
              <td className="border p-2">{item.apellido}</td>
              <td className="border p-2">{item.nombres}</td>
              <td className="border p-2">{item.motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
