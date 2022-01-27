import React,{useState, useEffect} from 'react'
import { Container,Form,Button,Row,Col} from 'react-bootstrap'
import Nav2 from './Nav2'
import { useNavigate } from 'react-router';
import { getProfile, updProfile } from './config/Myservice';

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function UpdProfile() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    
    let [address, setAddress] = useState('');
    let [user, setUser] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getProfile(sessionStorage.getItem('user'))
        .then(res=>{
            if(res.data.user){
                let data = res.data.user;
                setUser(data);
                setEmail(data.email);
                setName(data.name);
               
                setAddress(data.address);
                setPassword(data.password);
            }
        })
    },[])

    const updateProfile = (id) =>{
        let data = {name:name,email:email,address:address,password:password};
        updProfile(id, data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err);
            }
            else{
                alert(res.data.msg);
                navigate('/profile');
            }
        })
    }
            
    return (
        <Container>
        <Nav2/>
        <Container className="mt-5">
            <h4>Update Profile </h4>
        <Form>
        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Name
                </Form.Label>
                <Col sm="10">
                <Form.Control  type="text" placeholder="Enter Name" name="name"  defaultValue={user.name} onChange={(e)=>{setName(e.target.value)}}
                />
                {name!='' && name.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="10">
                <Form.Control  type="text" placeholder="Enter Email" name="email" defaultValue={user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                {email!='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                </Col>
            </Form.Group>
           
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Address
                </Form.Label>
                <Col sm="10">
                <Form.Control  type="text" placeholder="Enter Address" name="address" defaultValue={user.address} onChange={(e)=>{setAddress(e.target.value)}}/>
                {address!='' && address.length < 10 && <span className="text-danger">Enter Address correctly</span>}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="10">
                <Form.Control type="password" placeholder="Password" name="password" defaultValue={user.password} onChange={(e)=>{setPassword(e.target.value)}}/>
                {password!='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                </Col>
            </Form.Group>
            <Button variant="info" onClick={()=>updateProfile (user._id)}>Update</Button>
            
            </Form>
        </Container>
    </Container>
    )
}
