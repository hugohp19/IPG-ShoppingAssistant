import React from 'react';
import 'date-fns';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DownloadExcel from '../../utils/ExportToExcel';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ViewOrderTableByDate() {
  let todayDate = new Date().toLocaleString().split(',')[0];
  const [selectedFromDate, setSelectedFromDate] = React.useState(todayDate);
  const [selectedToDate, setSelectedToDate] = React.useState(todayDate);
  const [dateRange, setDateRange] = React.useState({});
  const [organizeData, setOrganizeData] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState({display: false, msg: ''});
  const [orders, setOrders] = React.useState();
  const classes = useStyles();
  
  function CustomError(message) {
    this.message = message;
    this.name = 'UserException';
  }

  const handleFromDateChange = (date) => {
    setErrorMsg({display: false, msg: ''})
    setSelectedFromDate(date);
    setDateRange({...dateRange, from: date.toLocaleString().split(',')[0]});
  };

  const handleToDateChange = (date) => {
    setErrorMsg({display: false, msg: ''})
    // Cloning the date object to be able to modify it and no change the original date
    const tempDate =  new Date(date.getTime());
    setSelectedToDate(date.toLocaleString().split(',')[0]);
    // adding 1 day to the clone date object to send to the API so it can query orders from that same day
    const endOfWeek = new Date(tempDate.setDate(tempDate.getDate() + 1));
    setDateRange({...dateRange, to: endOfWeek.toLocaleString().split(',')[0]});
  };

  const getOrdersByDate = async () => {
    setErrorMsg({display: false, msg: ''})
    try {
      if(dateRange.from === null || dateRange.from === undefined) throw new CustomError('La Fecha "Desde" no puede ser nula');
      if(dateRange.from > todayDate) throw new CustomError('La Fecha "Desde" no puede mayor a hoy');
      
      if(dateRange.to === null || dateRange.to === undefined) throw new CustomError('La Fecha "Hasta" no puede ser nula');
      if(dateRange.to > todayDate) throw new CustomError('La Fecha "Hasta" no puede ser mayor a hoy');
      if(dateRange.from > dateRange.to) throw new CustomError('La Fecha "Desde" no puede ser mayor que la fecha "Hasta"');
 
      const response = await axios({
        method: 'POST',
        url: `/api/orders/ordersbydates`,
        data: {from: dateRange.from, to: dateRange.to},
        withCredentials: "include",
      });
      setOrders(response.data);
      const organizeDataTemp = response.data.map((order)=>{
        const sortedOrders = order.order.sort((a,b)=>{
          return a.product.code - b.product.code
        })
        return {...order, order: sortedOrders}
      });
      setOrganizeData(organizeDataTemp)
    } catch (error) {
      if(error.name === 'UserException'){
        setErrorMsg({display: true, msg: error.message});
      } else {
        setErrorMsg({display: true, msg: 'Something went wrong'});
      }
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePickerContainer>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Desde"
            value={selectedFromDate}
            onChange={handleFromDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Hasta"
            value={selectedToDate}
            onChange={handleToDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <Button color="primary" onClick={getOrdersByDate}>
            Find
          </Button>
          {errorMsg.display && <ErrorMessage>{errorMsg.msg}</ErrorMessage>}
        </DatePickerContainer>
      </MuiPickersUtilsProvider>
      {
        orders ?
        (
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
                    <TableRow key={row.id} style={{color: 'lightgray'}}>
                      <TableCell key={row.id}>
                        {row.createdAt}
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
        ) :
        (
          <p>Nothing here</p>
        )
      }
    </>
  );
}

const DatePickerContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: #fff;
  font-weight: 600;
  background-color: #ed2213;
  border-radius: 5px;
  padding: 3px 10px;
`;