import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react';

export default function ItemCard(props){
    const [items,setItems] = useState(Object.keys(props.menuItems[props.items]["sizes"])[0])
    const handleSubmit = (event) => {
        event.preventDefault();
        var itemName = props.items
        var itemSize = items
        var itemPrice = props.menuItems[props.items]["sizes"][items]
        console.log(itemName + " " + itemSize + " " + itemPrice);
    }

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
            <Button className="col-md-6" variant="success" type="submit">Add to Cart</Button>
        </Form>
    )
}