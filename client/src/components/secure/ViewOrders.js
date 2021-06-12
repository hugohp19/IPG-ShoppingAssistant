import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import ViewOrderTable from "../Table/ViewOrderTable";

const ViewOrders = () => {
  const [productos, setProductos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState([]);

  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() - 5);
  console.log(todayDate);
  console.log(moment(todayDate).format());
  const timeTemp = moment(todayDate).format();


  return (
    <ViewOrdersContainer>
      <ViewOrderTable data={tableData} />
    </ViewOrdersContainer>
  );
};

export default ViewOrders;

const ViewOrdersContainer = styled.div`
  background-color: lightblue;
`;
