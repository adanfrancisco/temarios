import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import axios

export default function Login() {
    let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await axios.get("http://localhost:3001/login", {
          params: { dni, email },
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (err) {
        setError("DNI o Email incorrectos");
      }
    };
//     if (credentials.email === "admin@test.com" && credentials.password === "1234") {
//      navigate("/docentes")
//     } else {
//       alert("Credenciales incorrectas");
//     }
//   };

  return (
    <Container component={Paper} style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
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
          name="password"
          type="password"
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
