import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

import { saveDocente, updateDocente} from "../../api/index.js";
import Swal from "sweetalert2";

export default function DocenteForm({ open, onClose, docente, refetch }) {
  const [formData, setFormData] = useState({
    dni: "",
    apellido: "",
    nombres: "",
    domicilio: "",
    localidad: "",
    email: "",
    telefono: "",
    userType: "user"
  });

  useEffect(
    () => {
      if (docente) {
        setFormData({
          dni: docente.dni || "",
          apellido: docente.apellido || "",
          nombres: docente.nombres || "",
          domicilio: docente.domicilio || "",
          localidad: docente.localidad || "",
          email: docente.email || "",
          telefono: docente.telefono || "",
          userType: docente.userType || "user"
        });
      } else {
        setFormData({
          dni: "",
          apellido: "",
          nombres: "",
          domicilio: "",
          localidad: "",
          email: "",
          telefono: ""
        });
      }
    },
    [docente]
  );

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("nuevo docente: ", formData);
    try {
      if (docente) {
        await updateDocente(formData);
        Swal.fire("Éxito", "Docente actualizado correctamente", "success");
      } else {
        await saveDocente(formData);
        Swal.fire("Éxito", "Docente guardado correctamente", "success");
      }
      refetch();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      onClose();
      Swal.fire(
        "Error",
        error.message || "Hubo un problema al guardar el docente",
        "error"
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {docente ? "Editar Docente" : "Añadir Docente"}
      </DialogTitle>

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
            label="Nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Domicilio"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Localidad"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="userType-label">Tipo</InputLabel>
            <Select
              labelId="userType-label"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
