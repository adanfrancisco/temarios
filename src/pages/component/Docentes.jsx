import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchDocentes } from "../../api/index.js";
import DocenteList from "./DocenteList";
import DocenteForm from "./DocenteForm";
import usePersonStore from "../../stores/userStore.jsx";

export default function Docentes() {
  const { data: docentes,  refetch } = useQuery({
    queryKey: ["docentes"],
    queryFn: fetchDocentes
  });

  console.log("esaa: ", docentes);
  const [open, setOpen] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);



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
      <Button onClick={() => handleOpen()} variant="contained" color="primary">
        Añadir Docente
      </Button>
      <Button onClick={() => handleClose ()} variant="contained" color="primary">
        Salir
      </Button>

      <DocenteList
        docentes={docentes || []}
        onEdit={handleOpen}
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
