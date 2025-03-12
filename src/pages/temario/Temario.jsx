import Fiche from "./Fiche";
import NavBar from "./NavBar"; // Importa la barra de navegación
import userStore from "../../stores/userStore";

const Temario = () => {
  const { apellido  } = userStore(state => state);
  // const { apellido, nombres, dni, typeUser } = userStore(state => state);
  // const { materias } = userStore(state => state);
  localStorage.getItem("materia-store");
  // const objetoJson = [
  //   { dato: 'asdasd' },
  //   { dato: '234234' },
  // ];
  // const arr = objetoJson.map(elemento => Object.entries(elemento));

  // console.log(arr);
  return (
    <div>
      <NavBar apellido={apellido}/>
      <Fiche />
    </div>
  );
};

export default Temario;
