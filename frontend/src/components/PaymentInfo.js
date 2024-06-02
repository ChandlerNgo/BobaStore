import {Form} from 'react-bootstrap';
import {useState} from 'react';

export default function PaymentInfo(props) {
    const [edited,setEdited] = useState(false)
    var smallText;
    
    if(props.label === "Name on card"){
        smallText = <small className="text-body-secondary">Full name as displayed on card</small>
    }else{
        smallText = null
    }
    function checkValidation(){
        if(props.validate){
            return true
        }else{
            return false
        }
    }
    // remove was validated
    // replace with custom is invalid / is valid bits
    return (
        <Form.Group className={edited ? props.name : props.name}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control className={edited ? (checkValidation() ? "is-valid" : "is-invalid") : ""} type={props.type} value={props.value} onChange={e => {props.setItem(e.target.value); setEdited(true)}} required={true}/>
            {smallText}
            <Form.Text className="invalid-feedback">
                {props.invalid_feedback}
            </Form.Text>
        </Form.Group>
    )
}