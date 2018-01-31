import React, { Component } from 'react';

import Employee from './models/Employee';

import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [new Employee(1, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(2, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(3, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(4, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(5, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(6, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(7, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(8, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(9, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(10, 'Lois Brewer', 8749823456, 'Sales Manager')],
      selectedEmployee: null
    };

    this.employeeCounter = this.state.employees.length+1

    this.addEmployee = this.addEmployee.bind(this)
    this.selectEmployee = this.selectEmployee.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  addEmployee() {
    let tempEmployees = this.state.employees;
    tempEmployees.push(new Employee(this.employeeCounter, 'New Employee', '1234567890', 'New Employee'))
    this.employeeCounter++
    this.setState({ employees: tempEmployees })
  }

  selectEmployee(employee) {
    this.setState({ selectedEmployee: employee });
  }

  refresh() {
    this.setState(this.state);
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div className="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={this.selectEmployee} addEmployee={this.addEmployee} />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={this.refresh} />
        </div>
        <footer className="footer">
          Version 1.3
        </footer>
      </div>
    )
  }
}

export default App;
