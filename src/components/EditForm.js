import { Form, Button } from 'react-bootstrap'
import { EmployeeContext } from '../contexts/EployeeContext'
import { useContext, useState } from 'react'
const EditForm = ({ theEmployee }) => {

    // const { updateEmployee } = useContext(EmployeeContext); // reducerdan önce
    const { dispatch } = useContext(EmployeeContext);
    const employee = theEmployee;
    const id = employee.id;

    const [name, setName] = useState(employee.name)
    const [email, setEmail] = useState(employee.email)
    const [address, setAddress] = useState(employee.address)
    const [phone, setPhone] = useState(employee.phone)

    const updatedEmployee = { id, name, email, address, phone };
    const handleSubmit = (e) => {
        e.preventDefault();
        //   updateEmployee(id, updatedEmployee); // Reducerdan önce  
        dispatch({ type: 'UPDATE_EMPLOYEE', id, updatedEmployee })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="address *"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}

                    rows={3}
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone *"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}

                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Edit Employee
            </Button>
        </Form>
    )
}
export default EditForm;