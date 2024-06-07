import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Topping from '../components/Topping';
import { useNavigate } from "react-router-dom";

export default function Toppings(props){
    const navigate = useNavigate()
    const [toppings,setToppings] = useState({})
    const [selectedToppings,setSelectedToppings] = useState({})
    const [total,setTotal] = useState(props.item['price'] === null ? 0 : props.item['price'])
    const port = process.env.PORT || 8000
    const productPrice = props.item['price']
    const getToppings = () => {
        axios.get(`http://localhost:${port}/toppings`)
        .then(res => {
            setToppings(res.data)
        });
    }

    const handleOrderMore = (event) => {
        event.preventDefault();
        addToCart()
        navigate('/menu')
    };
    
    const handleCheckOut = (event) => {
        event.preventDefault();
        addToCart()
        navigate('/cart')
    };

    function addToCart(){
        var itemName = props.item['productName']
        var itemSize = props.item['size']
        var itemPrice = props.item['price']
        console.log(itemName + " " + itemSize + " " + itemPrice);
        if(props.cart.length === 0){
            props.setCart([{"productName":itemName,"size":itemSize,"price":itemPrice,"toppings":selectedToppings}])
        }else{
            props.setCart([...props.cart,{"productName":itemName,"size":itemSize,"price":itemPrice,"toppings":selectedToppings}])
        }
    }
    
    useEffect(() => {
        getToppings()
        if(JSON.stringify(props.item) === JSON.stringify({})){
            navigate('/menu')
        }
    }, []);

    useEffect(() => {
        var current = 0
        var keys = Object.keys(selectedToppings)
        for(let i = 0; i < keys.length;i++){
            current += selectedToppings[keys[i]]
        }
        setTotal(productPrice + current)
    }, [selectedToppings]);



    return (
        <Form className="list-group container">
            <h2>Pick toppings for your {props.item['size']} {props.item['productName']}</h2>
            <hr></hr>
            <div className='row'>
                <div className='col'>
                    {Object.keys(toppings).map((i) => {
                        return (
                            <Topping key={toppings[i]["toppingName"]+toppings[i]["price"]} toppingName={toppings[i]["toppingName"]} toppingPrice={toppings[i]["price"]} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings}/>
                        )
                    })}
                </div>
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your Item</span>
                        <span className="badge bg-primary rounded-pill">{Object.keys(selectedToppings).length}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">
                                    {props.item['size']} {props.item['productName']}
                                </h6>
                                {Object.keys(selectedToppings).map((item,i) => {
                                    return (
                                        <ul key={i} className="list-group d-flex justify-content-between">
                                            <li className="list-group d-flex justify-content-between">
                                                <small className="text-body-secondary">1x {item}</small>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                            <div>
                                <small className="text-body-secondary">${props.item['price']}</small>
                                {Object.keys(selectedToppings).map((item,i) => {
                                    return (
                                        <ul key={i} className="list-group d-flex justify-content-between">
                                            <li className="list-group d-flex justify-content-between">
                                                <small className="text-body-secondary">${selectedToppings[item]}</small>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${isNaN(total) ? 0 : total.toFixed(2)}</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <Button variant="primary" type="submit" className='col' onClick={handleOrderMore}>
                    Order More
                </Button>
                <Button variant="success" type="submit" className='col' onClick={handleCheckOut}>
                    Check Out
                </Button>
            </div>
        </Form>
    )
}