import React, { Component } from 'react'
import EmployeeServices from '../services/EmployeeServices';

export default class ViewEmployeeComponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeServices.getEmployeesById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }
    //method to handle cancel employee request
    cancel() {
        this.props.history.push('/employees-list');
    }


    render() {
        return (
            <>
                <div className="col-md-6 offset-md-3 mt-5">
                    <div className="card">
                        <h3 className="text-center card-header">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h6> View Employee Details</h6>
                                </div>
                                <div classNam="col-sm-6 ">
                                    <button className="btn btn-danger btn-sm btn-block float-right " onClick={this.cancel.bind(this)} >Cancel</button>
                                </div>
                            </div>
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label> Employee First Name: </label>
                                </div>
                                <div className="col-sm-6">
                                    <div> {this.state.employee.firstName}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label> Employee Last Name: </label>
                                </div>
                                <div className="col-sm-6">
                                    <div> {this.state.employee.lastName}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label> Employee Email ID: </label>
                                </div>
                                <div className="col-sm-6">
                                    <div> {this.state.employee.emailId}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
