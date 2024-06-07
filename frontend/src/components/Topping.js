import {Form} from 'react-bootstrap';
import {useState} from 'react';

export default function Topping(props){
    const [topping,setTopping] = useState(false)
    const addTopping = () => {
        setTopping(!topping)
        var selectedToppings = props.selectedToppings
        var toppingName = props.toppingName
        var toppingPrice = props.toppingPrice
        if(toppingName in selectedToppings){
            delete selectedToppings[toppingName]
        }else{
            selectedToppings[toppingName] = toppingPrice
        }
        props.setSelectedToppings({...selectedToppings})
    }
    return (
        <Form.Group key={props.toppingName+props.toppingPrice}>
            <Form.Label className="list-group-item d-flex gap-2">
            <input className="form-check-input flex-shrink-0" type="checkbox" onChange={addTopping}/>
            <span>
                {props.toppingName} | ${props.toppingPrice}
            </span>
            </Form.Label>
        </Form.Group>
    )
}