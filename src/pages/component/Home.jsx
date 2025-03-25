import { Container, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import usePersonStore from "../../stores/userStore";

const URL_SCRIPTS=import.meta.env.VITE_URL_SCRIPTS;

export default function Home() {
  usePersonStore.setState({
    url_api: URL_SCRIPTS
  })

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Gestión de TEMARIO</Typography>
      <Button component={NavLink} to="/login" variant="contained" color="secondary">
        Iniciar Sesión
      </Button>

    </Container>
  );
}
