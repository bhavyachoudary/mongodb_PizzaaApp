import axios from 'axios';
import { MAIN_URL } from './Url';

let token=localStorage.getItem('_token');

export function getProducts(){
    return axios.get(`${MAIN_URL}pizza/products`,{
        headers:{"Authorization":`Bearer ${token}`}
    });
}

export function registerUser(data){
    return axios.post(`${MAIN_URL}pizza/register`,data);
}


export function loginUser(data){
    return axios.post(`${MAIN_URL}pizza/login`,data);
}




export function cartAdd(item,email){
    return axios.get(`${MAIN_URL}pizza/cart/${item.pname}/${item.price}/${email}`);
}


export function getOrder(email){
    return axios.get(`${MAIN_URL}pizza/orders/${email}`);
}


export function deleteorder(id){
    return axios.delete(`${MAIN_URL}pizza/deleteorder/${id}`);
}
export function checkout_order(email){
    return axios.get(`${MAIN_URL}pizza/checkout/${email}`);
}
export function getAllOrder(email){
    return axios.get(`${MAIN_URL}pizza/allorders/${email}`);
}
export function getProfile(email){
    return axios.get(`${MAIN_URL}pizza/profile/${email}`);
}
export function updProfile(id, data){
    return axios.put(`${MAIN_URL}pizza/updprofile/${id}`,data);
}