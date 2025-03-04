import { Container, Typography, Button } from "@mui/material";
import { NavLink } from "react-router";
export default function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Bienvenido a la Gestión de Docentes</Typography>
      <Button component={NavLink} to="/login" variant="contained" color="secondary">
        Iniciar Sesión
      </Button>
      <Button component={NavLink} to="/docentes" variant="contained" color="primary" style={{ marginLeft: 10 }}>
        Ir a Docentes
      </Button>
    </Container>
  );
}
