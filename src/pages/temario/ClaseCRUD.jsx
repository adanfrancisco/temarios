import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Edit, Delete, NorthWest } from "@mui/icons-material";
import Swal from "sweetalert2";
import useParametros from "../../stores/useParametros"; // Importa el store de Zustand
// import axios from "axios";

const API_URL = "https://temarios-back.onrender.com/clases";

export default function ClaseCRUD() {
  const mate = useParametros((state) => state.cursos);
  const materiaSeleccionada = mate.curso1.nombre;

  const [clases, setClases] = useState([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    numeroClase: "1",
    tema: "MI TEMA",
    actividades: "LAS ACTIVIDADES",
    materia: materiaSeleccionada ? materiaSeleccionada.nombre : "" // Usa la materia desde Zustand
  });

  useEffect(() => {
    if (materiaSeleccionada) {
      fetch(`${API_URL}/${materiaSeleccionada}`)
        .then((res) => res.json())
        .then((data) => setClases(data))
        .catch((error) => console.error("Error al obtener clases", error))
    }
  }, [materiaSeleccionada]);

  const handleOpen = (clase = null, index = null) => {
    if (clase) {
      setFormData(clase);
      setEditando(index + 2);
    } else {
      setFormData({
        fecha: "",
        numeroClase: "",
        tema: "",
        actividades: "",
        materia: materiaSeleccionada ? materiaSeleccionada.nombre : ""
      });
      setEditando(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materiaSeleccionada) {
      Swal.fire("Error", "No hay materia seleccionada", "error");
      return;
    }

    const method = editando ? "PUT" : "POST";
    const url = editando
      ? `${API_URL}/${materiaSeleccionada}/${editando}`
      : `${API_URL}/${materiaSeleccionada}`;

    try {
      console.log(url + method + formData)
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error al guardar la clase");

      Swal.fire("Éxito", "Clase guardada correctamente", "success");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // const handleDelete = async (index) => {
  //   const fila = index + 1;
  //   try {
  //     console.log('DELETE', `${API_URL}/${materiaSeleccionada}/${fila}`)
  //     // const response = await fetch(`${API_URL}/${materiaSeleccionada}/${fila}`, { method: "DELETE" });
  //     await axios.delete(`${API_URL}/${materiaSeleccionada}/${fila}`)
  //     .then((response) => {
  //       console.log('DELETE', response)
  //       Swal.fire("Éxito", "Clase eliminada correctamente", "success");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.error('Error al eliminar la clase:', error);
  //     });




  //   } catch (error) {
  //     Swal.fire("Error", error.message, "error");
  //   }
  // };

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
              {/* <TableCell>Acciones</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>

            {

              clases.length === 0 || clases.length === undefined || clases.length === null
                ? <TableRow><TableCell colSpan={5}>No hay clases</TableCell></TableRow>
                : clases.map((clase, index) => (
                  <TableRow key={index}>
                    <TableCell>{clase.fecha}</TableCell>
                    <TableCell>{clase.numeroClase}</TableCell>
                    <TableCell>{clase.tema}</TableCell>
                    <TableCell>{clase.actividades}</TableCell>
                    {/* <TableCell>
                      <IconButton onClick={() => handleOpen(clase, index)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <Delete color="secondary" />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editando ? "Editar Clase" : "Añadir Clase"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              fullWidth margin="normal" InputLabelProps={{ shrink: true }}
            />

            <TextField label="N° de Clase" name="numeroClase" value={formData.numeroClase} onChange={handleChange} fullWidth margin="normal" />
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
