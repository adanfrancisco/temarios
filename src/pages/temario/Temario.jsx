import Fiche from "./Fiche";
import NavBar from "./NavBar"; // Importa la barra de navegación

const Temario = () => {
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
      <NavBar />
      <Fiche />
    </div>
  );
};

export default Temario;
