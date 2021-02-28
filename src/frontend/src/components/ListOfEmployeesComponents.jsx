import React, { Component } from "react";
import EmployeeServices from "../services/EmployeeServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify";

class ListOfEmployeesComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [], //this is the empty array
    };
    //bind addEmployee method in constructor
    this.addEmployee = this.addEmployee.bind(this);
    // update function bind
    this.editEmployee = this.editEmployee.bind(this);
    //delete employee 
    this.deleteEmployee = this.deleteEmployee.bind(this);
    //view employee
    this.viewEmployee = this.viewEmployee.bind(this);
  }
  //view employee 
  viewEmployee(id){
    this.props.history.push(`/view-employees/${id}`);
}

  // delete employee
  deleteEmployee(id) {
    EmployeeServices.deleteEmployee(id).then(res => {
      this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
      toast.warning('Employee Deleted Successfully!!');
    });
  }

  editEmployee(id) {
    this.props.history.push(`/create-employees/${id}`);
  }

  componentDidMount() {
    EmployeeServices.getEmployees().then((res) => {
      this.setState({
        employees: res.data,
      });
    });
  }

  //method to handle add employee request
  addEmployee() {
    this.props.history.push('/create-employees/_add');
  }
  render() {
    return (
      <>
        <div className="card mt-5">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-6">
                <h5 className="text-center float-left">Employees List</h5>
              </div>
              <div className="col-sm-6">
                <button type="button" className="btn btn-primary float-right" onClick={this.addEmployee} >Add Employee</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row text-center">
              <div className="table table-responsive">
                <table className="table  table-bordered  table-striped">
                  <thead>
                    <tr>
                      <th>Employee First Name</th>
                      <th>Employee Last Name</th>
                      <th>Employee Email Id</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Employee First Name</th>
                      <th>Employee Last Name</th>
                      <th>Employee Email Id</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {this.state.employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.emailId}</td>
                        <td>
                        <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-alert-light btn-sm"><FontAwesomeIcon icon={faEye} /> </button>
                          <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info btn-sm" ><FontAwesomeIcon icon={faPencilAlt} /></button>
                        &nbsp;
                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-warning btn-sm" ><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ListOfEmployeesComponents;
