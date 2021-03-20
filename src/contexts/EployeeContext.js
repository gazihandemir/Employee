import { createContext } from 'react';
import { useEffect, useReducer } from "react" //  hook 
import { v4 as uuidv4 } from 'uuid'
export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
    // const [employess, setEmployess] = useState([
    //     { id: uuidv4(), name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222' },
    //     { id: uuidv4(), name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735' },
    //     { id: uuidv4(), name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931' },
    //     { id: uuidv4(), name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731' },
    //     { id: uuidv4(), name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097' }
    // ])
    const reducer = (employees, action) => {
        switch (action.type) {
            case 'ADD_EMPLOYEE':
                return [...employees,
                {
                    id: uuidv4(),
                    name: action.employee.name,
                    email: action.employee.email,
                    address: action.employee.address,
                    phone: action.employee.phone
                }]
            case 'REMOVE_EMPLOYEE':
                return employees.filter(employee => employee.id !== action.id);
            case 'UPDATE_EMPLOYEE':
                return employees.map((employee) => (employee.id === action.id ? action.updatedEmployee : employee));
            default:
                return employees;
        }
    };

    const init = () => {
        const employees = localStorage.getItem("employees");
        return employees ? JSON.parse(employees) : [];
    };
    const initialState = [
        { id: uuidv4(), name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222' },
        { id: uuidv4(), name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735' },
        { id: uuidv4(), name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931' },
        { id: uuidv4(), name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731' },
        { id: uuidv4(), name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097' }

    ];
    const [employess, dispatch] = useReducer(reducer, initialState, init);


    // useEffect(() => { // Reducerden önce 
    //     const employees = localStorage.getItem("employees");
    //     setEmployess(JSON.parse(employees));
    // }, [])
    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employess));
    })



    const sortedEmployees = employess.sort((a, b) => (a.name < b.name ? -1 : 1))

    // const addEmployee = (name, email, address, phone) => { // reducerdan önce
    //     setEmployess([...employess, { id: uuidv4(), name, email, address, phone }])
    // }

    // const deleteEmployee = (id) => { // reducerdan önce
    //     setEmployess(employess.filter(employee => employee.id !== id))
    // }

    // const updateEmployee = (id, updatedEmployee) => { // reducerdan önce
    //     setEmployess(employess.map((employee) => (employee.id === id ? updatedEmployee : employee)))
    // }
    return (
        // <EmployeeContext.Provider value={{ sortedEmployees, addEmployee, deleteEmployee, updateEmployee }}> // reducer kullanmadan önce
        <EmployeeContext.Provider value={{ sortedEmployees, dispatch }}>
            { props.children}
        </EmployeeContext.Provider >
    )
}
export default EmployeeContextProvider;