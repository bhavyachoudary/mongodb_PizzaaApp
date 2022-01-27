import React, { useState, useEffect } from 'react'
import Nav2 from './Nav2'
import { Container, Card, Button } from 'react-bootstrap';
import { getProfile } from './config/Myservice';

export default function Profile() {
    let [user, setUser] = useState([]);

    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    setUser(res.data.user);

                }
            })
    }, [])

    return (
        <>
            <Nav2 />
            <h2 className="pt-5 pl-5 text-secondary">Profile Details</h2>
            <Container className="text-center">
                <Card style={{ width: 700 }} className="m-5">
                    <Card.Body>
                        <img src="/images/logo1.jpg" width="200" /><br />
                        <Card.Title><h2>Name: {user.name}</h2></Card.Title>
                        <Card.Subtitle><h3>Email:{user.email}</h3></Card.Subtitle>
                        <Card.Text>

                            <h3>Address: {user.address}</h3>
                        </Card.Text>
                        {/* <Button variant="primary" href="/upd_profile">Update profile</Button> */}
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
