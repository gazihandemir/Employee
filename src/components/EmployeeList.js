import Employee from './Employee'
import { useState, useContext, useEffect } from 'react'
import { EmployeeContext } from '../contexts/EployeeContext'
import { Button, Modal, Alert } from 'react-bootstrap'
import AddForm from './AddForm'
import Pagination from './Pagination'
const EmloyeeList = () => {
    const { sortedEmployees } = useContext(EmployeeContext)

    const [showAlert, setShowAlert] = useState(false);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(3)

    const handleClose = () => { setShow(false); }
    const handleShow = () => { setShow(true); }
    //   const handleShowAlert = () => setShowAlert(true);
    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };
    useEffect(() => { // array değişince çalış 
        handleClose();
        return () => {
            handleShowAlert();
        }
    }, [sortedEmployees]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployess = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);

    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case 'increment':
    //             return { count: state.count + 1 }
    //         case 'decrement':
    //             return { count: state.count - 1 }
    //         default:
    //             throw new Error();
    //     }
    // }
    // const initialState = { count: 0 };
    // const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Employee List successfully updated !
            </Alert>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //   employess.sort((a, b) => (a.name < b.name ? -1 : 1)).map((employee) => (
                        currentEmployess.sort((a, b) => (a.name < b.name ? -1 : 1)).map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination
                pages={totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentEmployess={currentEmployess}
                sortedEmployees={sortedEmployees} />
            {/* Count : {state.count}
            <button className="ml-1" onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button className="ml-1" onClick={() => dispatch({ type: 'decrement' })}>-</button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Modal
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* 
            <input ref={myRef} type="text" />
            <button onClick={onButtonClick}>Focus İnput</button> */}
        </>
    )

}


export default EmloyeeList;

//                         employess.sort((a, b) => a.name.localeCompare(b.name)).map((employee) => (
//                         employess.sort((a, b) => (a.name < b.name ? -1 : 1)).map((employee) => (
    // const myRef = useRef(null);
    // console.log(myRef)
    // const onButtonClick = () => {
    //     console.log(myRef)
    //     myRef.current.focus();
    // }

