import axios from "axios";

const API_URL = "http://localhost:3001";

export async function fetchDocentes() {
  const response = await fetch(`${API_URL}/get-docentes`);
  if (!response.ok) throw new Error("Error al obtener docentes");
  const data = await response.json();
  return data.result; // Asegurate de devolver solo el array de docentes
}

export const saveDocente = async (docente) => {
  const { dni, apellido, nombres, domicilio, localidad, correoabc, telefono } = docente;
  console.log('voy a guardar a: ', docente);
  try {
    await axios.post(`${API_URL}/add-docente`, {
      dni,
      apellido,
      nombres,
      domicilio,
      localidad,
      correoabc,
      telefono
    });
  } catch (error) {
    console.error('Error saving docente:', error.response.data);
    throw error.response.data;
  }
};

export const deleteDocente = async (dni) => {
  console.log('voy a borrar a: ', dni)
  await axios.delete(`${API_URL}/delete-docente`, {
    data: { dni }
  });
};

export const updateDocente = async (data) => {
  console.log('voy a actualizar: ', data);
  const { dni, apellido, nombres, domicilio, localidad, email, telefono } = data;
  const correoabc = email;
  try {
    const response = await axios.put(`${API_URL}/update-docente`, {
      dni,
      apellido,
      nombres,
      domicilio,
      localidad,
      correoabc,
      telefono
    });
    return response.data;
  } catch (error) {
    console.error('Error updating docente:', error);
    throw error;
  }
};
