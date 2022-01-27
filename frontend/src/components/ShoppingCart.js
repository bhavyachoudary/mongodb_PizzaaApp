import React,{useState, useEffect} from 'react'
import { Container,Table,Button} from 'react-bootstrap'
import Nav2 from './Nav2';
import {getOrder, deleteorder} from './config/Myservice';
import { useNavigate } from 'react-router';

export default function ShoppingCart() {
    let [orders,setOrders] = useState([]);
   let [total, setTotal] = useState(0);
    const navigate = useNavigate()

    useEffect(()=>{
        getOrder(sessionStorage.getItem('user'))
        .then(res=>{
            if(!res.data.msg){
            setOrders(res.data.orders)
            const ttl = res.data.orders.reduce((prev, cur)=> prev + (cur.price * cur.quantity),0)
           setTotal(ttl)
            }
        })
         },[]);
         const deleteord=(id)=>{
            window.location.reload();
            deleteorder(id)
    
            .then(res=>{
                alert(res.data.msg)
                navigate("/cart");
            })
        }


    return (
        <Container>
            <Nav2/>
           <Container className="mt-3">
           <h3 className="pb-4 pt-2">Cart</h3>
           {orders.length!==0 ? 
           <Table  size="sm">
               <thead>
                   <tr>
                       <th>Id</th>
                       <th>Name</th>
                       <th>Price</th>
                       <th>Qunatity</th>
                       <th>Actions</th>
                   </tr>
                   </thead>
                    
                    <tbody>
                        {orders.map((item,index)=>
                        <tr key={item._id}>
                            <td>{index+1}</td>
                        <td>{item.pname}</td>
                        <td>{item.price}</td>
                        {/* <td>{item.quantity}</td> */}
                        <input type="number" name="quantity" value={item.quantity}/>
                      
                        <td><Button type="submit" variant="danger" onClick={()=>deleteord(item._id)}>Delete</Button></td>
                        </tr>
                        )}
                        <tr>
                    <h3 className="pt-3" colSpan="3"><b>Total:</b> <i className="text-danger"><b>${total}</b></i></h3>
          
                    <td><Button href="/checkout" className="mt-3" variant="info" >Check out</Button></td>
                    </tr>
                    </tbody>
            </Table>:<h3 className="mt-5 bg-danger p-2">Your cart is empty</h3>}
           </Container>
            
        </Container>
    )
}
