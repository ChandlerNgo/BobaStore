import {Form} from 'react-bootstrap';
import React,{useState} from 'react';

export default function OrderInfo(props){
    const [edited,setEdited] = useState(false)
    return (
        <Form.Group className={edited ? props.name + " was-validated" : props.name} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={e => {props.setItem(e.target.value); setEdited(true)}} required={true}/>
            <Form.Text className="invalid-feedback">
                {props.invalid_feedback}
            </Form.Text>
            <div></div>
        </Form.Group>
    )
}