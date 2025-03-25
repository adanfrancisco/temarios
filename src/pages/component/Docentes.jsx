import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchDocentes, ausenteDocente } from "../../api/index.js";
import DocenteList from "./DocenteList";
import DocenteForm from "./DocenteForm";
import usePersonStore from "../../stores/userStore.jsx";
import Swal from "sweetalert2";

export default function Docentes() {
  const { apellido } = usePersonStore();

  const { data: docentes, refetch } = useQuery({
    queryKey: ["docentes"],
    queryFn: fetchDocentes
  });

  console.log("esaa: ", docentes);
  const [open, setOpen] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);

  // const handleAusente = async (docente = {}) => {
  //   if (!docente) return; // Evita errores si docente es null o undefined

  //   try {
  //     const { value: motivo } = await Swal.fire({
  //       title: "Ingrese el motivo",
  //       input: "text",
  //       inputPlaceholder: "Escriba aquí...",
  //       showCancelButton: true,
  //       confirmButtonText: "Aceptar",
  //       cancelButtonText: "Cancelar",
  //       inputValidator: (value) => !value && "Debe ingresar un texto!"
  //     });

  //     if (motivo) {
  //       docente.motivo = motivo;
  //       console.log("Docente actualizado:", docente);

  //       const data = await ausenteDocente(docente);
  //       console.log("Respuesta del servidor:", data);
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error("Error en handleAusente:", error);
  //   }
  // };

  const handleAusente = async (docente = {}) => {
    if (!docente) return; // Evita errores si docente es null o undefined

    try {
      const { value: formValues } = await Swal.fire({
        title: "Ingrese los datos",
        html: `
          <input id="motivo" class="swal2-input" placeholder="Ingrese el motivo">
          <input id="fecha" type="date" class="swal2-input">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const motivo = document.getElementById("motivo").value;
          const fecha = document.getElementById("fecha").value;

          if (!motivo) {
            Swal.showValidationMessage("Debe ingresar un motivo!");
            return false;
          }
          if (!fecha) {
            Swal.showValidationMessage("Debe seleccionar una fecha!");
            return false;
          }
          return { motivo, fecha };
        }
      });

      if (formValues) {
        docente.motivo = formValues.motivo;
        docente.fecha = formValues.fecha; // Guarda la fecha seleccionada
        console.log("Docente actualizado:", docente);

        const data = await ausenteDocente(docente);
        console.log("Respuesta del servidor:", data);
        refetch();
      }
    } catch (error) {
      console.error("Error en handleAusente:", error);
    }
  };


  const handleOpen = (docente = null) => {
    setSelectedDocente(docente);
    setOpen(true);
  };

  const handleClose = () => {
    usePersonStore.setState({ apellido: "", nombres: "", dni: "", typeUser: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("materia-store");
    localStorage.removeItem("person-store");


    window.location.href = "/";
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Docentes
      </Typography>
      {
        apellido === "ALOE" &&
        <Button onClick={() => handleOpen()} variant="contained" color="primary">
          Añadir Docente
        </Button>
      }
      <Button onClick={() => handleClose()} variant="contained" color="primary">
        Salir
      </Button>

      <DocenteList
        docentes={docentes || []}
        onEdit={handleOpen}
        onAusente={handleAusente}
        refetch={refetch}
      />

      <DocenteForm
        open={open}
        onClose={() => setOpen(false)}
        docente={selectedDocente}
        refetch={refetch}
      />
    </Container>
  );
}
