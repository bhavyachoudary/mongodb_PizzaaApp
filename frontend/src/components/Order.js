import React from 'react'
import { Container,Alert,Button } from 'react-bootstrap'
import Nav2 from './Nav2'
export default function Order() {
    return (
        <Container>
        <Nav2/>
        <Container className="mt-3">
            <h1 className="pt-3 pb-3">Order has been placed Successfully</h1>
            <Alert varaint="success">You will  receive notification to email with order details</Alert>
            <Button varaint="info" className="mt-3" href="/menu">Go an order some other </Button>
        </Container>
    </Container>
    )
}
