import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
// import { deleteDocente } from "../../api/index.js";
import Swal from "sweetalert2";

export default function DocenteList({ docentes, onEdit }){//, refetch }) {
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>tipo</TableCell>
            <TableCell>Acciones</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docentes.map((doc) => (
            <TableRow key={doc.dni}>
              <TableCell>{doc.dni}</TableCell>
              <TableCell>{doc.apellido}</TableCell>
              <TableCell>{doc.nombres}</TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.telefono}</TableCell>
              <TableCell>{doc.userType}</TableCell>
              <TableCell>{doc.fecha}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(doc)} variant="contained" color="warning">Editar</Button>
                {/* <Button onClick={() => handleDelete(doc.dni)} variant="contained" color="error">Eliminar</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
