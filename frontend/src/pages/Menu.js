import axios from 'axios'
import React,{useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function Menu(props){
    const [menuItems,setMenuItems] = useState({})

    const getMenuItems = () => {
        axios.get('http://localhost:8000/menu-items')
        .then(res => {
            setMenuItems(res.data)
        });
    }
    
    useEffect(() => {
        getMenuItems()
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className="row g-5 w-50 mx-auto">
            Menu
            {JSON.stringify(menuItems)}
            {Object.keys(menuItems).map((items) => {
                return (
                    <div className="col-md-6 col-lg-4" key={items}>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{items}</Card.Title>
                                <Card.Text>
                                    button text
                                </Card.Text>
                                <div>
                                    <Form className='row mx-auto' onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Select aria-label="" className="col-md-6 w-50" id={items}>
                                                {Object.keys(menuItems[items]).map((size) => {
                                                    return (
                                                        <option key={items+size} value={size}>{size} | ${menuItems[items][size]}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Button className="col-md-6" variant="success" type="submit"></Button>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}