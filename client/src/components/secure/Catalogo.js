import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ViewProductsTable from "../Table/ViewProductsTable";
import axios from 'axios';

const Catalogo = (props) => {
  const [productos, setProductos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);

  const {refetch, setRefetch } = props;
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() - 5);
  const timeTemp = moment(todayDate).format();

  const getProducts = async () => {
    try {
      const products = await axios({
        method: 'GET',
        // url: `${process.env.REACT_APP_API_URL}/getproducts`,
        url: `/api/getproducts`,
        withCredentials: "include",
      })
      setProductos(products.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(refetch){
      getProducts();
    }
      setRefetch(false)
    
  }, [refetch]);

  return (
    <div>
      <ViewProductsTable products={productos} refetch={refetch} setRefetch={setRefetch}/>
    </div>
  );
};

export default Catalogo;

const ViewOrdersContainer = styled.div`
  background-color: lightblue;
`;
