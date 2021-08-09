import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DownloadExcel from '../../utils/ExportToExcel'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ViewOrderTable( {data}) {
  const classes = useStyles();
  const organizeData = data.map((order)=>{
    const sortedOrders = order.order.sort((a,b)=>{
      return a.product.code - b.product.code
    })
    return {...order, order: sortedOrders}
  })

  return (
    <>
    <DownloadExcel data={organizeData} />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell align="right">Producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio c/u</TableCell>
            <TableCell align="right">Tienda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizeData.map((row) => (
            <>
            <TableRow key={row.id} style={{backgroundColor: 'lightgray'}}>
              <TableCell component="th" scope="row" key={row.id}>
                {row.owner.firstName} {row.owner.lastName}
              </TableCell>
            </TableRow>
            
              {row.order.map((item)=>{
                return(
                <TableRow key={row.id}>
                  <TableCell />
                  <TableCell align="right">{item.product.code}</TableCell>
                  <TableCell align="right">{item.product.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.product.price}</TableCell>
                  <TableCell align="right">{item.product.store}</TableCell>
                </TableRow>
                )
              })}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
