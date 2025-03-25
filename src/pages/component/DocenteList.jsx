import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
// import { deleteDocente } from "../../api/index.js";
import Swal from "sweetalert2";
import usePersonStore from "../../stores/userStore";
import { useEffect, useState } from "react";
export default function DocenteList({ docentes, onEdit, onAusente }) {

  const { apellido } = usePersonStore();
  useEffect(() => {
    console.log("Apellido: ", apellido);


  }, [])


  //, refetch }) {
  // const handleDelete = async (dni) => {
  //   const result = await Swal.fire({
  //     title: "¿Estás seguro?",
  //     text: "Esta acción no se puede deshacer!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, eliminar!",
  //   });
  //   if (result.isConfirmed) {
  //     await deleteDocente(dni);
  //     refetch();
  //   }
  // };
  const [search, setSearch] = useState("");
  const filteredEntries = docentes?.slice(1).filter(docentes =>
    docentes.telefono.toLowerCase().includes(search.toLowerCase()) ||
    docentes.email.toLowerCase().includes(search.toLowerCase()) ||
    docentes.apellido.toLowerCase().includes(search.toLowerCase()) ||
    docentes.nombres.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <input
        type="text"
        placeholder="Buscar..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {docentes.slice(1).map((doc) => ( */}
          {filteredEntries?.map((doc) => (
            <TableRow key={doc.dni}>
              <TableCell>{doc.dni}</TableCell>
              <TableCell>{doc.apellido}</TableCell>
              <TableCell>{doc.nombres}</TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.telefono}</TableCell>
              <TableCell>{doc.userType}</TableCell>
              <TableCell>{doc.fecha}</TableCell>
              <TableCell>
                <Button onClick={() => onAusente(doc)} variant="contained" color="inherit" >AUSENTE</Button>
                {
                  apellido === "ALOE" &&
                  <Button onClick={() => onEdit(doc)} variant="contained" color="warning">Editar</Button>
                }
                {/* <Button onClick={() => handleDelete(doc.dni)} variant="contained" color="error">Eliminar</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
