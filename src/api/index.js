import axios from "axios";

const API_URL = "http://localhost:3001";



export async function fetchDocentes() {
  const response = await fetch(`${API_URL}/get-docentes`);
  if (!response.ok) throw new Error("Error al obtener docentes");
  const data = await response.json();
  return data.result; // Asegurate de devolver solo el array de docentes
}


export const saveDocente = async (docente) => {
  const { dni, apellido, nombres, domicilio, localidad, correoabc } = docente;
  console.log('voy a guardar a: ', docente)
  await axios.post(`${API_URL}/add-docente`,
    {
      "dni": dni,
      "apellido": apellido,
      "nombres": nombres,
      "domicilio": domicilio,
      "localidad": localidad,
      "correoabc": correoabc
    }
  );

};

export const deleteDocente = async (dni) => {
  console.log('voy a borrar a: ', dni)
  await axios.delete(`${API_URL}/delete-docente`, {
    data: { dni }
  });
};
