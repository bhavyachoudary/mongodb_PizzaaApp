import React from 'react'
import { Container,Card,Button} from 'react-bootstrap'
// import Nav1 from './Nav1'
export default function Home() {
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

            <div class="container bg-light p-5">
                <h1 className="">PIZZA DELIVERY</h1>
                <p className="pt-4">Welcome to pizza delivery service.This is the place when you may choose the most delicious pizza you like from wide variety of options! </p>
                <hr />
                <p className="pt-3">We're performing delivery free of charge in case if your order is higher than 20$
                </p>
                <button className="btn btn-secondary mt-3" type="submit" href="/login">Sign In and Order</button>
                </div>
        </Container>
           
        </Container>
    )
}
