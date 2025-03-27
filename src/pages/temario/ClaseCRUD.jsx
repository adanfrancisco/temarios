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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fecha: "",
    numeroClase: "",
    tema: "",
    actividades: "",
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
    setErrors({});
    setEditando(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Este campo es obligatorio";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
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
            <TextField label="Fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} error={!!errors.fecha} helperText={errors.fecha} />
            <TextField label="N° de Clase" name="numeroClase" type="number" value={formData.numeroClase} onChange={handleChange} fullWidth margin="normal" error={!!errors.numeroClase} helperText={errors.numeroClase} />
            <TextField label="Tema" name="tema" value={formData.tema} onChange={handleChange} fullWidth margin="normal" error={!!errors.tema} helperText={errors.tema} />
            <TextField label="Actividades" name="actividades" value={formData.actividades} onChange={handleChange} fullWidth margin="normal" multiline rows={4} error={!!errors.actividades} helperText={errors.actividades} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
