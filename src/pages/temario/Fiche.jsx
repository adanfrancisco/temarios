import userStore from "../../stores/userStore";
import styles from "./Temario.module.css";

const Fiche = () => {
  const { apellido, nombres, dni } = userStore(state => state);
  return (
    <div>

      <div className={styles.container}>
        <h2>Información del Usuario</h2>
        <div className={styles.card}>
          <p>
            Apellido: {apellido}
          </p>
          <p>
            Nombres: {nombres}
          </p>
          <p>
            DNI: {dni}
          </p>
          <p><b>Dirijase a su materia por favor, tanto para escribir en el temario como para verificar que se guardó su clase

          </b>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Fiche