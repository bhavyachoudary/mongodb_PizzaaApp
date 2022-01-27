import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Order from './components/Order';
import Allorder from './components/Allorder';
import Profile from './components/Profile';
import UpdProfile from './components/UpdProfile';



function App() {
   
  return (
   
       <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/allorders" element={<Allorder/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/upd_profile" element={<UpdProfile/>} />
      </Routes>
    </Router>

</>
    
    
  );
}

export default App;
