import axios from "axios";
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";
class EmployeeService {
  getEmployees() {
    try {
      return axios.get(EMPLOYEE_API_BASE_URL);
    } catch (err) {
      console.warn("some error in api");
    }
  }

  //create employee
  createEmployee(employee) {
    try {
      return axios.post(EMPLOYEE_API_BASE_URL, employee);
    } catch (error) {
      console.warn("something went wrong in api");
    }
  }
  //getEmployeeById
  getEmployeesById(employeeId) {
    try {
      return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId)
    } catch (error) {
      console.warn('something went wrong in getEmployeeById rest Api');
    }
  }

  //update Employee
  updateEmployee(employee, id) {
    try {
      return axios.post(EMPLOYEE_API_BASE_URL + '/' + id, employee);
    } catch (error) {
      console.warn("something went wrong in update api");
    }
  }

  //delete Employee 
  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
  }
}

export default new EmployeeService(); //here  object of EmployeeService  class exported
