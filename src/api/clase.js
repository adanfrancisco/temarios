const API_URL=import.meta.env.VITE_URL_SCRIPTS;

// Guardar nueva clase
export const saveClase = async (claseData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claseData),
  });

  if (!response.ok) {
    throw new Error("Error al guardar la clase");
  }

  return await response.json();
};

// Actualizar clase existente
export const updateClase = async (claseData) => {
  const response = await fetch(`${API_URL}/${claseData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claseData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la clase");
  }

  return await response.json();
};

// Obtener todas las clases (por si necesitas listarlas)
export const getClases = async () => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    throw new Error("Error al obtener las clases");
  }

  return await response.json();
};

// Obtener una clase por ID
export const getClaseById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la clase");
  }

  return await response.json();
};

// Eliminar una clase
export const deleteClase = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la clase");
  }

  return await response.json();
};
