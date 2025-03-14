import { Navigate, useNavigate } from "react-router-dom";
import userStore from "../../stores/userStore";
import styles from './Navbar.module.css'
import { useState, useEffect } from "react";
import useParametros from "../../stores/useParametros";

const NavBar = ({apellido}) => {
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const eliminarCurso = useParametros((state) => state.eliminarCurso);
  const agregarCurso = useParametros((state) => state.agregarCurso);

  useEffect(() => {
    // Obtener datos desde localStorage y convertirlos a array
    const storedData = localStorage.getItem("materia-store");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMaterias(parsedData.state?.materias || []);
      console.log('materias', parsedData.state?.materias)
    }
  }, []);
  const cursos = [...new Set(materias.map(m => m.curso))];

  const handleLogout = () => {
    userStore.setState({ apellido: "", nombres: "", dni: "", typeUser: "", id: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("materia-store");
    localStorage.removeItem("person-store");

    navigate("/", { replace: true });
  };


  const handleSelect = (curso) => () => {
    eliminarCurso('curso1');
    setMenuOpen(!menuOpen)

    agregarCurso('curso1', { nombre: curso, solapa: 'je', docente: 'pepe' });
    navigate(`/materia`, { replace: true });
    console.table(curso)
  }

  return (
    <nav className={styles.navbar}>
      <h1
        className={styles.title}
        onClick={() => navigate("/temario", { replace: true })}
      >TEMARIO</h1>
      <small>{apellido}</small>

      <div className={styles.menuContainer}>
        <button onClick={() => setMenuOpen(!menuOpen)} className={styles.menuButton}>
          ☰ CURSOS
        </button>
        {menuOpen && (
          <div className={styles.dropdownMenu}>


            <ul>
              {cursos.map((curso, index) => (
                <li key={index} value={curso}
                  onClick={handleSelect(curso)}
                >{curso}</li>
              ))}
            </ul>

          </div>
        )}
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </nav>

  );
};

export default NavBar;
