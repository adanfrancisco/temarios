import { Container, Typography, Button } from "@mui/material";
import { NavLink } from "react-router";

const ErrorScreen = () => {
  return (
    <Container>
    <Typography variant="h4" gutterBottom>PAGINA DE ERROR</Typography>
    <Button component={NavLink} to="/login" variant="contained" color="secondary">
      Ir al Inicio
    </Button>
  </Container>
  )
}

export default ErrorScreen