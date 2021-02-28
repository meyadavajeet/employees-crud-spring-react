package com.coderajeet.emsb.controllers;

import com.coderajeet.emsb.exceptions.ResourceNotFoundException;
import com.coderajeet.emsb.models.Employee;
import com.coderajeet.emsb.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;

	/* get all Employees */
	@GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();      
    }

/**
 * 
 * @param employee
 * @return
 *//*
	 * @PostMapping("/employees") public Employee createEmployees(@RequestBody
	 * Employee employee) { return employeeRepository.save(employee); } 
	 */
	/*
	 * @PostMapping("/employees") public Employee createEmployee(@RequestBody
	 * Employee employee) { System.out.println(employee); return
	 * employeeRepository.save(employee); }
	 */

    /**
     * create new Employee
     * 
     * @param employee
     * @return
     */
    @PostMapping(value = "/employees")
    public ResponseEntity<Employee> createEmployees(@RequestBody Employee employee) {
        Employee employees = null;

        try {
          employees = this.employeeRepository.save(employee);
            System.out.println(employees);
            // return ResponseEntity.of(Optional.of(books));
            return ResponseEntity.status(HttpStatus.CREATED).body(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
    //get employee by id
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee Not found with this id :: "+id));
    	return ResponseEntity.ok(employee);
    }
    
    //update employee by id
    @PostMapping("employees/{id}")
    public ResponseEntity<Employee> updateEmployeeyId(@PathVariable Long id, @RequestBody Employee employeeDetail){
    	Employee employee = employeeRepository.findById(id)
    			.orElseThrow(()->new ResourceNotFoundException("Employee Not Found with this id:: " +id ));
    	employee.setFirstName(employeeDetail.getFirstName());
    	employee.setLastName(employeeDetail.getLastName());
    	employee.setEmailId(employeeDetail.getEmailId());
    	Employee employee2 = employeeRepository.save(employee);
    	return ResponseEntity.ok(employee2);
    	 
    }
    
	/*
	 * //delete Employee by id
	 * 
	 * @DeleteMapping("/employees/{id}")
	 *  public ResponseEntity<Map<String, Boolean>>
	 * deleteEmployeeById(@PathVariable Long id){ Employee employee =
	 * employeeRepository.findById(id) .orElseThrow(() -> new
	 * ResourceNotFoundException("Employee not exist with id :" + id));
	 * employeeRepository.delete(employee); Map<String, Boolean> response = new
	 * HashMap<>(); response.put("deleted", Boolean.TRUE); return
	 * ResponseEntity.ok(response); }
	 * 
	 */
    
  //delete Employee by id
 	@DeleteMapping("/employees/{id}")
 	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
 		Employee employee = employeeRepository.findById(id)
 				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
 		
 		employeeRepository.delete(employee);
 		Map<String, Boolean> response = new HashMap<>();
 		response.put("deleted", Boolean.TRUE);
 		return ResponseEntity.ok(response);
 	}
 	
    
}