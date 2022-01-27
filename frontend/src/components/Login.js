import React,{useState} from 'react'
import { Container,Nav,Form,Row,Col,Button } from 'react-bootstrap'
import {loginUser} from './config/Myservice';
import { useNavigate } from 'react-router';

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login= ()=>{
        let data = {email:email, password:password};
        loginUser(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
            alert(res.data.msg)
            console.log(res.data)
            localStorage.setItem("_token",res.data.token);
            
            sessionStorage.setItem("user", email);
            navigate('/menu')
            }
        });
            
    }
    return (
        <Container>

             <Container>
             <nav className="navbar container navbar-light bg-light mt-5 mb-3 p-4">
                <a className="navbar-brand"><img src="/images/logo.jpg" width="80" /></a>

               <div className="ml-auto">
                <button class="btn btn-outline-secondary mr-2"><a href="/register" style={{ textDecoration: 'none', color: 'black' }}>Sign Up</a></button>
                <button class="btn btn-outline-secondary"><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></button>
                </div>
            </nav>

           
        </Container>

            <Container className=" ">
             
                <Container className="d-flex justify-content-center">
                <img src="/images/login.jpg" width="300"  className="d-flex justify-content-center"/><br/>
            <Form className="w-50  bg-warning p-4">
            <h2 className="pb-4 text-center">Login Form </h2>
              
                <Form.Group  className="mb-3 mt-3">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control  type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {email!='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {password!='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                    </Col>
                </Form.Group>
                <Button variant="success" onClick={login}>Login</Button>
                </Form>
                </Container>
            </Container>
        </Container>
    )
}
