import {Button, Form} from 'react-bootstrap';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props){
    const navigate = useNavigate()
    const [email, setEmail] = useState(props.email)
    const [password, setPassword] = useState(props.password)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const handleSignUp = (event) => {
        event.preventDefault();
        props.setEmail(email)
        props.setPassword(password)
        props.setFirstName(firstName)
        props.setLastName(lastName)
        navigate('/')
    }

    return (
        <div className="container">
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => {setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => {setFirstName(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => {setLastName(e.target.value)}}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}