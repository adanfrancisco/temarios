import { createRoot } from "react-dom/client";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/component/Login.jsx";
import ErrorScreen from "./pages/component/ErrorScreen.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  DocenteForm,
  DocenteList,
  Docentes,
  Home,
  Temario
} from "./pages/component";
import Materia from "./pages/temario/Materia.jsx";
import AttendanceForm from "./pages/asistencia/AttendanceForm.jsx";
import FechasApp from "./pages/component/FechasApp.jsx";
import Ausencias from "./pages/component/Ausencias.jsx";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/docentes" element={<Docentes />} />
        <Route path="/docentes/form" element={<DocenteForm />} />
        <Route path="/docentes/list" element={<DocenteList />} />
        <Route path="/temario" element={<Temario />} />
        <Route path="/materia" element={<Materia />} />
        <Route path="/asistencia" element={<AttendanceForm />} />
        <Route path="/fechas" element={<FechasApp />} />
        <Route path="/ausencias" element={<Ausencias />} />

        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </Router>
   </QueryClientProvider>
);
