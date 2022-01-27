import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import { registerUser } from './config/Myservice';
import { useNavigate } from 'react-router';

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Register() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cpassword, setCpassword] = useState('');
    let [name, setName] = useState('');
    let [address, setAddress] = useState('');
    const navigate = useNavigate();


    const register = () => {
        let data = { name: name, email: email, address: address, password: password };
        registerUser(data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {
                    alert(res.data.msg)
                    navigate('/login')
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

            <Container className="mt-3 w-75 bg-info p-4">
                <h1 className="text-center text-dark pb-3">Registration Form</h1>
                <Form >

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>User Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter User Name" name="name" id="name" onChange={(event) => { setName(event.target.value) }} required />
                                {name != '' && name.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={(event) => { setEmail(event.target.value) }} required />
                                {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Pasword:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={(event) => { setPassword(event.target.value) }} required />
                                {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter ConfirmPassword" name="cpassword" id="cpassword" onChange={(event) => { setCpassword(event.target.value) }} required />
                                {cpassword != '' && cpassword != password && <span className="text-danger">Passwords doesn't match</span>}
                            </Form.Group>
                        </Col>
                    </Row>


                    <Col md={12}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" name="address" id="address" onChange={(event) => { setAddress(event.target.value) }} required />
                            {/* { address != '' && address.length < 10 && <span className="text-danger">Enter Address correctly</span> } */}
                        </Form.Group>
                    </Col>


                    <Button variant="success" onClick={register}>Register</Button>
                    <Button variant="warning" type="submit" href="/login" className="ml-3"> Login</Button>
                </Form>
            </Container>
        </Container>
    )
}
