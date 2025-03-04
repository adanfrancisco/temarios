import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchDocentes = async () => {
  const response = await axios.get(`${API_URL}/get-data`);
  return response.data.data; // Adaptado a la estructura de la API
};

export const saveDocente = async (docente) => {
  const { dni, apellido, nombre, opcion } = docente;
  await axios.post(`${API_URL}/add-data`, { dni, apellido, nombre, opcion });
};

export const deleteDocente = async (dni) => {
  await axios.delete(`${API_URL}/delete-docente?dni=${dni}`);
};
