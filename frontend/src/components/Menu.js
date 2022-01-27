import React,{useState, useEffect} from 'react'
import { Container,Card, Button, Row, Col } from 'react-bootstrap';
import Nav2 from './Nav2'
import { getProducts, cartAdd } from './config/Myservice';
import { useNavigate } from 'react-router';

import jwt_decode from 'jwt-decode';

export default function Menu() {
    const [uid,setUid]=useState('')
    let [products, setProducts] = useState([]);
    let [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{

        if(localStorage.getItem('_token')!=undefined){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode)
            setUid(decode.uid)


        if(sessionStorage.getItem('user') === undefined){
            navigate('/login')
            }
        setEmail(sessionStorage.getItem('user'));
        getProducts()
        .then(res=>{
            console.log(res.data)
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                setProducts(res.data.products);
            }
        })
    }
    },[])
    const addCart = (item) =>{
        window.location.reload();
        console.log(item)
        cartAdd(item, email)
        .then(res=>{
            // alert(res.data.msg)
        })
    }
    return (
        <Container>
            <Nav2/>
            <Container className="mt-3">
            <h2>Welcome - {uid}</h2>
            <Row>
                {products.map(item=>
                <Col lg={4} key={item._id}>
            <Card className="m-3 p-3">
                <Card.Img variant="top" src={`/images/${item.image}`} width="300" height="200" />
                <Card.Body>
                    <Card.Title>{item.pname}</Card.Title>
                    <div className="d-flex justify-content-between">
                    <Button variant="danger" onClick={()=>{addCart(item)}}>Add to cart</Button>
                    <Card.Text>
                    ${item.price}
                    </Card.Text>
                    
                    </div>
                </Card.Body>
                </Card>
                </Col>
                )}
                </Row>
                </Container>
        </Container>
    )
}
