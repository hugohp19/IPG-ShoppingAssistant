import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Formulario from "../secure/SecureComponents/FormularioEdit";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Code", minWidth: 80 },
  {
    id: "price",
    label: "Price $",
    minWidth: 80,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "store",
    label: "Store",
    minWidth: 80,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "photo",
    label: "Photo",
    minWidth: 80,
    align: "center",
    format: (value) => <img src={value} alt="Foto" style={{ width: "30px" }} />,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({ products, refetch, setRefetch }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const rows = [...products];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleEdit(e, data) {
    e.preventDefault();
    setProductData(data);
    setOpen(true);
  }

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key={"edit"}
                  align={"center"}
                  style={{ minWidth: 50 }}
                >
                  EDIT
                </TableCell>
                <TableCell
                  key={"delete"}
                  align={"center"}
                  style={{ minWidth: 50 }}
                >
                  DELETE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell align={column.align} key="number">
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : column.format
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell align="center">
                        <EditIcon
                          onClick={(e) => {
                            handleEdit(e, row);
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <DeleteForeverIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Formulario open={open} handleClose={handleClose} data={productData} />
    </>
  );
}
