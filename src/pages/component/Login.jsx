import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePersonStore from "../../stores/userStore";
import useMateriaStore from "../../stores/useMateriaStore";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", dni: "" });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const resUsuario = await axios.get("https://temarios-back.onrender.com/login", {
        params: { email: credentials.email, dni: credentials.dni }
      });

      // console.log("resMateria: ", resMateria.data.result);
      console.log("resUsuario: ", resUsuario.data.result);

      usePersonStore.setState({
        apellido: resUsuario.data.result.apellido,
        nombres: resUsuario.data.result.nombres,
        email: resUsuario.data.result.email,
        dni: resUsuario.data.result.dni,
        typeUser: resUsuario.data.result.userType,
        id: resUsuario.data.result.id,
        fecha: resUsuario.data.result.fecha
      });

      console.log("tipo de usuario:", resUsuario.data.result.userType);
      if (resUsuario.data.result.userType == "user") {
      const resMateria = await axios.get(`https://temarios-back.onrender.com/get-materias?dni=${credentials.dni}`)

      // console.log(resMateria)
      useMateriaStore.setState({
        materias: resMateria.data.result.map(materia => ({
          apellido: materia.apellido,
          dni: materia.dni,
          curso: materia.curso,
          division: materia.division,
          id: materia.id,


        }))
      });
    }
      if (resUsuario.data.result.userType == "user") {
        navigate("/temario");
      } else {
        localStorage.setItem("token", resUsuario.data.token);
        navigate("/docentes");
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err,
        icon: "error",
        confirmButtonText: "Cool"
      });
    }
  };


  return (
    <Container component={Paper} style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          name="dni"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
    </Container>
  );
}
