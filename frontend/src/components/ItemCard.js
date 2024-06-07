import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react';
import { NavLink,useNavigate } from "react-router-dom";

export default function ItemCard(props){
    const [items,setItems] = useState(Object.keys(props.menuItems[props.items]["sizes"])[0])
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        var itemName = props.items
        var itemSize = items
        var itemPrice = props.menuItems[props.items]["sizes"][items]
        console.log(itemName + " " + itemSize + " " + itemPrice);
        props.setItem({"productName":itemName,"size":itemSize,"price":itemPrice})
        navigate('/toppings')
    };

    const handleChange = event => {
        setItems(event.target.value);
    };

    return (
        <Form className='row mx-auto' onSubmit={handleSubmit}>
            <Form.Select aria-label="" className="col-md-6 w-50" value={items} onChange={handleChange}>
                {Object.keys(props.menuItems[props.items]["sizes"]).map((size) => {
                    return (
                        <option key={props.items+size} value={size}>{size} | ${props.menuItems[props.items]["sizes"][size]}</option>
                    )
                })}
            </Form.Select>
            <NavLink to='/toppings' className="col-md-6" variant="success" type="submit"><Button variant="success" type="submit" onClick={handleSubmit}>Add to Cart</Button></NavLink>
        </Form>
    )
}