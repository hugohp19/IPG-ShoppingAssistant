import React from "react";
import ReactExport from "react-export-excel";
import styled from 'styled-components';

export default function DownloadExcel({ data }) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const multiDataSet = [
    {
      columns: [
        "Usuario",
        "Codigo",
        "Producto",
        "Cantidad",
        "Precio",
        "Tienda",
      ],
      data: [],
    },
  ];

  let arrayData = [];
  const newData = data.map((order) => {
    const orderNumber = order._id;
    const user = `${order.owner.firstName} ${order.owner.lastName}`;
    const phone = order.owner.phoneNumber;
    const store = order.store;

    const dataToExcel = order.order.map((item) => {
      return {
        orderNumber,
        user,
        phone,
        store,
        quantity: item.quantity,
        code: item.product.code,
        name: item.product.name,
        price: item.product.price,
      };
    });
    arrayData = [...arrayData, ...dataToExcel];
    return dataToExcel;
  });

  return (
    <div>
      <ExcelFile element={<Button>Export to Excel</Button>}>
        <ExcelSheet data={arrayData} name="Employees">
          <ExcelColumn label="Order #" value={(col) => col.orderNumber} />
          <ExcelColumn label="Usuario" value={(col) => col.user} />
          <ExcelColumn label="Codigo" value={(col) => col.code} />
          <ExcelColumn label="Producto" value={(col) => col.name} />
          <ExcelColumn label="Cantidad" value={(col) => col.quantity} />
          <ExcelColumn label="Precio" value={(col) => col.price} />
          <ExcelColumn label="Tienda" value={(col) => col.store} />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

const Button = styled.button`
  background-color: #01ACA2;
  width: 150px;
  height: 30px;
  color: white;
  font-weight: 600;
  border-radius: 30px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;

  &:hover{
    background-color: white;
    color: #01ACA2;
    border: 1px solid #01ACA2;
  }
`
