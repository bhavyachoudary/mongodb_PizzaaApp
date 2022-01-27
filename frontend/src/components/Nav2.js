import React,{useState,useEffect} from 'react'
import {Container,Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {getOrder} from '../components/config/Myservice';

export default function Nav2() {
    let [count, setCount] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
    getOrder(sessionStorage.getItem('user'))
    .then(res=>{
        if(res.data.orders){
            setCount(res.data.orders.length)
        }
    })
})
    const logout=()=>{
        sessionStorage.clear();
        navigate('/');
    }
    return (
        <>
        <Nav className="bg-warning mt-4">
        <Container className="d-flex justify-content-between">
                    <Nav.Item><Nav.Link href="/"><img src="/images/logo.jpg" width="70" height="70" alt="logo" />
                    </Nav.Link></Nav.Item>
               <Nav>
               <Nav.Item> 
               <Nav.Link href="/menu" className="p-2 mt-4 text-dark">Menu</Nav.Link>
               </Nav.Item>
               <Nav.Item>
               <Nav.Link href="/cart" className="p-2 mt-4 text-dark">Cart
               {count!=0 && <span className="btn btn-dark btn-sm d-inline m-2 text-white">{count}</span>}</Nav.Link>
               </Nav.Item>
               <Nav.Item>
               <Nav.Link href="/profile" className="p-2 mt-4 text-dark">Profile</Nav.Link>
               </Nav.Item>
               <Nav.Item>
               <Nav.Link href="/allorders" className="p-2 mt-4 text-dark">Orders</Nav.Link>
               </Nav.Item>
               <Nav.Item>
               <Nav.Link className=" btn btn-outline-dark text-white p-2 mt-4" onClick={()=>logout()}>Logout</Nav.Link>
               </Nav.Item>
               </Nav>
               </Container>
           </Nav>
         

   </>
    )
}
  