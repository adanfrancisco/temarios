import userStore from "../../stores/userStore";
import styles from "./Temario.module.css";

const Fiche = () => {
    const { apellido, nombres, dni, typeUser, id } = userStore(state => state);
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
          <p>
            TIPO: {typeUser}
          </p>
          <p>
            ID: {id}
          </p>
        </div>
      </div>

    </div>
  )
}

export default Fiche