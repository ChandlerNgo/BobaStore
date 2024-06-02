import axios from 'axios'
import React,{useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import ItemCard from '../components/ItemCard';

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

    return (
        <div className="row g-5 w-50 mx-auto">
            {/* Menu */}
            {/* {JSON.stringify(menuItems)} */}
            {Object.keys(menuItems).map((items) => {
                return (
                    <div className="col-md-6 col-lg-4" key={items}>
                        <Card>
                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/` + menuItems[items]["image"]} alt={items}/>
                            <Card.Body>
                                <Card.Title>{items}</Card.Title>
                                <Card.Text>
                                    {menuItems[items]["description"]}
                                </Card.Text>
                                <ItemCard menuItems={menuItems} items={items}/>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}