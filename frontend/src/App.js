import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar.js';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Menu from "./pages/Menu.js";
import Order from "./pages/Order.js";
import Socials from "./pages/Socials.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Cart from "./pages/Cart.js";

export default function App() {
  // const [todoList, setTodoList] = useState()

  // const addTodoHandler = () => {
  //   axios.get('http://localhost:8000')
  //     .then(res => {
  //       console.log(res.data)
  //       setTodoList(res.data['Hello'])
  //   });
  // }
  // addTodoHandler()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  
  useEffect(() => {
    const storageEmail = localStorage.getItem("email")
    if(storageEmail){
      setEmail(JSON.parse(storageEmail))
    }
    const storagePassword = localStorage.getItem("password")
    if(storagePassword){
      setPassword(JSON.parse(storagePassword))
    }
    const storageFirstName = localStorage.getItem("firstName")
    if(storageFirstName){
      setFirstName(JSON.parse(storageFirstName))
    }
    const storageLastName = localStorage.getItem("lastName")
    if(storageLastName){
      setLastName(JSON.parse(storageLastName))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email))
    localStorage.setItem("password", JSON.stringify(password))
    localStorage.setItem("firstName", JSON.stringify(firstName))
    localStorage.setItem("lastName", JSON.stringify(lastName))
  })


  return (
    <BrowserRouter>
      <NavBar email={email} password={password} firstName={firstName} lastName={lastName} setEmail={setEmail} setPassword={setPassword} setFirstName={setFirstName} setLastName={setLastName}/>
      <Routes>
        <Route exact path="/" element={<Home email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
        <Route path="/about" element={<About email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
        <Route path="/menu" element={<Menu email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
        <Route path="/order" element={<Order email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
        <Route path="/socials" element={<Socials email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
        <Route path="/login" element={<Login email={email} password={password} firstName={firstName} lastName={lastName} setEmail={setEmail} setPassword={setPassword} setFirstName={setFirstName} setLastName={setLastName}/>}/>
        <Route path="/signup" element={<Signup email={email} password={password} firstName={firstName} lastName={lastName} setEmail={setEmail} setPassword={setPassword} setFirstName={setFirstName} setLastName={setLastName}/>}/>
        <Route path="/cart" element={<Cart email={email} password={password} firstName={firstName} lastName={lastName}/>}/>
      </Routes>
    </BrowserRouter>
  );
}