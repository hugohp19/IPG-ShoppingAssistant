import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UploadData from "../components/secure/UploadData";
import ViewOrders from "../components/secure/ViewOrders";
import ViewOrderTable from "../components/Table/ViewOrderTable";
import moment from "moment";
import Spinner from "../utils/Spinner";
import axios from "axios";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [productos, setProductos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);
  let productList;

  const getProductsAndOrders = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/orders`);
      const response = await axios.get(`/api/orders/orders`);
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsAndOrders();
  }, []);

  function getDataTable(data) {
    let compiledData = [];
    console.log(data);
    console.log(orders);
    data.map((order) => {
      console.log(order);
      delete order.isActive;
      delete order.orderTime;
      delete order.userId;
      compiledData = [...compiledData, ...Object.values(order)];
    });

    console.log(compiledData);
    let formatedDate = {};
    let formatedDataToArray = [];
    compiledData.map((item) => {
      console.log(item);
      if (formatedDate[item.id]) {
        formatedDate[item.id] = formatedDate[item.id] + item.quantity;
      } else {
        formatedDate[item.id] = item.quantity;
      }
    });
    console.log(formatedDate);
    const newData = Object.entries(formatedDate);
    console.log(newData);

    let prueba = [];
    console.log(productos);
    console.log(productList);
    newData.map((item) => {
      console.log(item[0]);
      console.log(productos[item[0]]);
      prueba = [
        ...prueba,
        { ...productList[item[0]], quantity: item[1], id: item[0] },
      ];
      // prueba = [...prueba,
      //   {[item[0]]: {...productos[item[0]], quantity: item[1]} }]
    });
    setTableData(prueba);
  }

  return (
    <DashboardContainer>
      <Link to='/'>
        <HomeIcon style={{textAlign: 'center', width: '100%', color: '#4C2C72', fontSize: '2rem'}}/>
      </Link>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Ver Orden" />
          <Tab label="Agregar Producto" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {orders ? <ViewOrderTable data={orders} /> : <Spinner />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UploadData />
      </TabPanel>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div``;
