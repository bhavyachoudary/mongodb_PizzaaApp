import React, { useState, useEffect } from 'react'
import Nav2 from './Nav2';
import { getAllOrder } from './config/Myservice';
import { Container, Table } from 'react-bootstrap';
export default function Allorder() {
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrder(sessionStorage.getItem('user'))
      .then(res => {
        if (res.data.orders) {
          setOrders(res.data.orders)
        }
      })
  })
  return (
    <>
      <Nav2 />
      <Container>
        <h2 className="pt-4 pb-3">List of All Orders</h2>
        <Table bordered className="mt-3 bg-secondary text-danger">
          <thead>
            <tr>
              <th>Id</th>
              <th>Item name</th>
              <th>Price</th>
              <th>Quantity</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody className="text-white">
            {orders.map((itm, ind) => {
              return <tr key={itm.id}>
                <td>{ind + 1}</td>
                <td>{itm.pname}</td>
                <td>${itm.price}</td>
                <td>{itm.quantity}</td>
                {/* <td>{itm.checkout? 'Delivered' : 'Yet to be delivered'}</td> */}
              </tr>
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}
