import React, { Component } from 'react';

import Employee from './models/Employee';

import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [
        new Employee(1, 'Bernice Ortiz', 4824931093, 'b_ortiz@gmail.com', 'CEO',),
        new Employee(2, 'Marnie Barnett', 3094812387, 'm_barnett@gmail.com', 'CTO'),
        new Employee(3, 'Phillip Weaver', 7459831843, 'p_weaver@gmail.com', 'Manager'),
        new Employee(4, 'Teresa Osborne', 3841238745, 't_osborne@gmail.com', 'Director of Engineering'),
        new Employee(5, 'Dollie Berry', 4873459812, 'd_berry@gmail.com', 'Front-End Developer'),
        new Employee(6, 'Harriett Williamson', 6571249801, 'h_williamson@gmail.com', 'Front-End Developer'),
        new Employee(7, 'Ruby Estrada', 5740923478, 'r_estrada@gmail.com', 'Back-End Developer'),
        new Employee(8, 'Lou White', 8727813498, 'l_white@gmail.com', 'Full-Stack Developer'),
        new Employee(9, 'Eve Sparks', 8734567810, 'e_sparks@gmail.com', 'Product Manager'),
        new Employee(10, 'Lois Brewer', 8749823456, 'l_brewer@gmail.com', 'Sales Manager')
      ],
      selectedEmployee: null
    };
    this.nextId = 11;

    this.newEmployee = this.newEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.selectEmployee = this.selectEmployee.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  newEmployee() {
    let currentEmployees = this.state.employees

    if (currentEmployees[currentEmployees.length - 1].name === 'New Employee') {
      alert('Please finish updating your current new employee before adding another.')
    }
    else {
      currentEmployees.push(new Employee(this.nextId, 'New Employee', 1111111111, 'New Employee'))
      this.setState({ employees: currentEmployees })
      this.selectEmployee(this.state.employees[this.state.employees.length - 1])
      this.nextId++
    }
  }

  deleteEmployee(employee) {
    let confirmed = confirm(`You are removing the employee record: \nID: ${employee.id}\n${employee.name}\n${employee.phone}\n${employee.title}`)
    if (confirmed) {
      let currentEmployees = this.state.employees
      let removeIndex = 0
      currentEmployees.forEach((person, i) => {
        if (employee.id === person.id)
          removeIndex = i
      })
      currentEmployees = currentEmployees.splice(removeIndex, 1)
      this.setState({ selectedEmployee: null })
    }
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
          <EmployeeList employees={this.state.employees} selectEmployee={this.selectEmployee} addEmployee={this.newEmployee} />
          <EmployeeEditor selected={this.state.selectedEmployee} refreshList={this.refresh} deleteEmployee={this.deleteEmployee} />
        </div>
      </div>
    )
  }
}

export default App;
