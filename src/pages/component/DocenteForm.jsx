import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { saveDocente } from "../../api/index.js";

export default function DocenteForm({ open, onClose, docente, refetch }) {
  const [formData, setFormData] = useState({ dni: "", apellido: "", nombres: "", domicilio: "", localidad: "", correoabc: "", telefono: "" });

  useEffect(() => {
    if (docente) {
      setFormData({
        dni: docente[0] || "",
        apellido: docente[1] || "",
        nombres: docente[2] || "",
        domicilio: docente[3] || "",
        localidad: docente[4] || "",
        correoabc: docente[5] || "",
        telefono: docente[6] || ""
      });
    } else {
      setFormData({ dni: "", apellido: "", nombres: "", domicilio: "", localidad: "", correoabc: "", telefono: "" });
    }
  }, [docente]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('nuevo docente: ',formData)
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
            name="correoabc"
            value={formData.correoabc}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
