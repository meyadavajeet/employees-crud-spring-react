import React, { Component } from 'react'
import EmployeeServices from '../services/EmployeeServices';
// Importing toastify module 
import { toast } from 'react-toastify';
toast.configure()
export default class CreateEmployeesComponents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }


        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);

        this.saveEmployee = this.saveEmployee.bind(this);
        // this.cancel = this.cancel.bind(this);
    }

    // get employee when page load
    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeServices.getEmployeesById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }

    changeFirstNameHandler = (e) => {
        this.setState({ firstName: e.target.value });
    }

    changeLastNameHandler = (e) => {
        this.setState({ lastName: e.target.value });
    }
    changeEmailIdHandler = (e) => {
        this.setState({ emailId: e.target.value });
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };
        console.warn('employee =>' + JSON.stringify(employee));

        if (this.state.id === '_add') {
            // create Employee
            EmployeeServices.createEmployee(employee).then(res => {

                // Calling toast method by passing string 
                toast.success('Employee Added Successfully!!')
                this.props.history.push("/employees-list");
            });
        } else {
            //update employee using axios
            EmployeeServices.updateEmployee(employee, this.state.id).then((res) => {
                console.warn("this is the response for update" + res);
                toast.success('Employee Updated Successfully!!');
                this.props.history.push('/employees-list');
            });
        }

    }

    //method to handle cancel employee request
    cancel() {
        this.props.history.push('/employees-list');
    }
    getTitle(){
       if(this.state.id === '_add'){
            return <h3 className="text-center">Add New Employee </h3>;
       }else{
           return <h3 className="text-center">Update Employee</h3>
       }
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 mt-5">
                            <div className="card">
                                <div className="card-header">
                                   {this.getTitle()}
                            </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label> First Name</label>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                className="form-control"
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label> Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                className="form-control"
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email ID</label>
                                            <input
                                                type="email"
                                                placeholder="EmailId"
                                                name="emailId"
                                                className="form-control"
                                                value={this.state.emailId} onChange={this.changeEmailIdHandler}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <button className="btn btn-success btn-block" onClick={this.saveEmployee}>Save </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <button className="btn btn-danger btn-block" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
