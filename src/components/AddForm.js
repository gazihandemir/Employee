import { Form, Button } from 'react-bootstrap'
import { EmployeeContext } from '../contexts/EployeeContext'
import { useContext, useState } from 'react'
const AddForm = () => {

    // const { addEmployee } = useContext(EmployeeContext); // reducerdan önce
    const { dispatch } = useContext(EmployeeContext);


    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [address, setAddress] = useState("");
    // const [phone, setPhone] = useState("");

    const [newEmployee, setNewEmployee] = useState({
        name: "", email: "", address: "", phone: ""
    })
    const onInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    }
    const { name, email, address, phone } = newEmployee;
    const handleSubmit = (e) => {
        e.preventDefault();
        // addEmployee(name, email, address, phone); // reducerdan önce
        dispatch({ type: "ADD_EMPLOYEE", employee: { name, email, address, phone } });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    // onChange={e => setName(e.target.value)}
                    onChange={e => onInputChange(e)}

                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={e => onInputChange(e)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="address *"
                    name="address"
                    value={address}
                    onChange={e => onInputChange(e)}
                    rows={3}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone *"
                    name="phone"
                    value={phone}
                    onChange={e => onInputChange(e)} />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>
    )
}
export default AddForm;