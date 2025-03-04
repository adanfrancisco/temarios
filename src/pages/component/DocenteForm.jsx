import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem } from "@mui/material";
import { saveDocente } from "../../api/index.js";

export default function DocenteForm({ open, onClose, docente, refetch }) {
  const [formData, setFormData] = useState({ dni: "", apellido: "", nombre: "", opcion: "A" });

  useEffect(() => {
    if (docente) {
      setFormData({
        dni: docente[0] || "",
        apellido: docente[1] || "",
        nombre: docente[2] || "",
        opcion: docente[3] || "A",
      });
    } else {
      setFormData({ dni: "", apellido: "", nombre: "", opcion: "A" });
    }
  }, [docente]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveDocente(formData);
    refetch();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{docente ? "Editar Docente" : "Añadir Docente"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!!docente} // Bloquear edición de DNI si es una edición
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Opción"
            name="opcion"
            value={formData.opcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
