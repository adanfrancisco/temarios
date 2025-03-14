import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useParametros from "../../stores/useParametros";
// import { useNavigate } from "react-router-dom";

const API_URL = "https://temarios-back.onrender.com/clases";

const fetchClases = async (materia) => {
  const res = await fetch(`${API_URL}/${materia}`);
  if (!res.ok) throw new Error("Error al obtener clases");
  return res.json();
};

export default function ClaseCRUD() {
  const queryClient = useQueryClient();
  const mate = useParametros((state) => state.cursos);
  const materiaSeleccionada = mate.curso1.nombre;
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    numeroClase: "1",
    tema: "MI TEMA",
    actividades: "LAS ACTIVIDADES",
    materia: materiaSeleccionada || "",
  });

  const { data: clases = [], error, isLoading } = useQuery({
    queryKey: ["clases", materiaSeleccionada],
    queryFn: () => fetchClases(materiaSeleccionada),
    enabled: !!materiaSeleccionada,
  });

  const mutation = useMutation({
    mutationFn: async ({ method, url, body }) => {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Error al guardar la clase");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clases", materiaSeleccionada]);
      Swal.fire("Éxito", "Clase guardada correctamente", "success");
      // navigate("/temario");
      setOpen(false);
    },
    onError: (error) => {
      Swal.fire("Error", error.message, "error");
    },
  });

  const handleOpen = (clase = null, index = null) => {
    setFormData(
      clase || {
        fecha: "",
        numeroClase: "",
        tema: "",
        actividades: "",
        materia: materiaSeleccionada || "",
      }
    );
    setEditando(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!materiaSeleccionada) {
      Swal.fire("Error", "No hay materia seleccionada", "error");
      return;
    }
    const method = editando ? "PUT" : "POST";
    const url = editando
      ? `${API_URL}/${materiaSeleccionada}/${editando}`
      : `${API_URL}/${materiaSeleccionada}`;
    mutation.mutate({ method, url, body: formData });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Añadir Clase
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>N° de Clase</TableCell>
              <TableCell>Tema</TableCell>
              <TableCell>Actividades</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>Cargando...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4}>Error al cargar las clases</TableCell>
              </TableRow>
            ) : clases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No hay clases</TableCell>
              </TableRow>
            ) : (
              clases.map((clase, index) => (
                <TableRow key={index}>
                  <TableCell>{clase.fecha}</TableCell>
                  <TableCell>{clase.numeroClase}</TableCell>
                  <TableCell>{clase.tema}</TableCell>
                  <TableCell>{clase.actividades}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editando ? "Editar Clase" : "Añadir Clase"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="N° de Clase" name="numeroClase" value={formData.numeroClase} onChange={handleChange} fullWidth margin="normal" type="number" />
            <TextField label="Tema" name="tema" value={formData.tema} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Actividades" name="actividades" value={formData.actividades} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}