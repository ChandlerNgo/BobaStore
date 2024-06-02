import {Button, Form} from 'react-bootstrap';
import React,{useState} from 'react';
import OrderInfo from '../components/OrderInfo';
import PaymentInfo from '../components/PaymentInfo';
import Products from '../components/Products';

export default function Cart(props){
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [paymentMethod,setPaymentMethod] = useState("")
    const [fullName,setFullName] = useState("")
    const [cardNumber,setCardNumber] = useState("")
    const [expirationDate,setExpirationDate] = useState("")
    const [CCV,setCCV] = useState("")

    function validateFullName(value){
        return /^[a-z\sA-Z]*$/.test(value) && value !== ""
    }

    function validateCardNumber(value){
        return /^([0-9]{4}[\s-]?){3}([0-9]{4})$/.test(value) && value !== ""
    }

    function validateExpirationDate(value){
        var length = false
        var dateFormat = false
        var month = false
        var year = false
        if(value.length === 5){
            length = true
            if(value[2] === "/"){
                dateFormat = true
            }

            var monthInt = parseInt(value[0]+value[1])
            if(!isNaN(monthInt) && monthInt >= 1 && monthInt <= 12){
                month = true
            }
            var yearInt = parseInt(value[3]+value[4])
            if(!isNaN(yearInt) && monthInt >= 0 && yearInt <= 99){
                year = true
            }
        }

        return length && dateFormat && value !== "" && month && year
    }

    function validateCCV(value){
        var ccv = false
        if(value.length === 3){
            var ccvInt = parseInt(value[0]+value[1]+value[2])
            if(!isNaN(ccvInt) && ccvInt >= 0 && ccvInt <= 999){
                ccv = true
            }
        }
        return ccv && value !== ""
    }

    return (
        <div className="row g-5 w-50 mx-auto">
            {/* products */}
            <Products/>
            {/* was-validated should be activated after submit button is clicked */}
            <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Order Information</h4>
                <Form className='row g-3'>
                    {/* is-valid/is-invalid */}
                    <OrderInfo name="mb-3 col-sm-6" controlId="" label="First Name" type="text" placeholder="First Name" value={firstName} setItem={setFirstName} invalid_feedback="Valid first name is required."/>
                    <OrderInfo name="mb-3 col-sm-6" controlId="" label="Last Name" type="text" placeholder="Last Name" value={lastName} setItem={setLastName} invalid_feedback="Valid last name is required."/>
                    <OrderInfo name="mb-3 col-12" controlId="formBasicEmail" label="Email address" type="email" placeholder="you@example.com" value={email} setItem={setEmail} invalid_feedback="Please enter a valid email address for shipping updates."/>

                    <hr className=""/>

                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                        <Form.Group className={paymentMethod !== "" ? "form-check was-validated" : "form-check"}>
                            <Form.Check id="credit" type="radio" name="paymentMethod" placeholder="Credit" value="credit" onChange={e => {setPaymentMethod(e.target.value)}} required={true}/>
                            <Form.Label className="form-check-label">Credit Card</Form.Label>
                        </Form.Group>

                        <Form.Group className={paymentMethod !== "" ? "form-check was-validated" : "form-check"}>
                            <Form.Check id="debit" type="radio" name="paymentMethod" placeholder="Debit" value="debit" onChange={e => {setPaymentMethod(e.target.value)}} required={true}/>
                            <Form.Label className="form-check-label">Debit Card</Form.Label>
                        </Form.Group>
                    </div>

                    <PaymentInfo validate={validateFullName(fullName)} type="text" label="Name on card" name="mb-3 col-6" value={fullName} setItem={setFullName} invalid_feedback="Name on card is required"/>
                    <PaymentInfo validate={validateCardNumber(cardNumber)} type="text" label="Credit card number" name="mb-3 col-6" value={cardNumber} setItem={setCardNumber} invalid_feedback="Credit card number is required"/>
                    <PaymentInfo validate={validateExpirationDate(expirationDate)} type="text" label="Expiration" name="col-md-3" value={expirationDate} setItem={setExpirationDate} invalid_feedback="Expiration date required"/>
                    <PaymentInfo validate={validateCCV(CCV)} type="text" label="CCV" name="col-md-3" value={CCV} setItem={setCCV} invalid_feedback="Security code required"/>

                    <hr className=""/>

                    <Button className="w-100 btn btn-primary btn-lg" variant="primary" type="submit">
                        Continue to checkout
                    </Button>
                </Form>
            </div>
        </div>
    )
}