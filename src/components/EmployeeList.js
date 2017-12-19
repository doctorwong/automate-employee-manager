import React, { Component } from 'react';

class EmployeeList extends Component {
  constructor(props){
    super(props)
    this.state = {
      employees : props.employees,
      filteredEmployees : props.employees,
      searchTerm : ''
    }
    this.handleUpdates = this.handleUpdates.bind(this)
    this.clear = this.clear.bind(this)
  }
  //updates to the employee list will NOT reset searches, though it will re-trigger the filter.
  componentWillReceiveProps(props){
    this.setState({employees : props.employees})
    this.handleUpdates({target:{value:this.state.searchTerm}})
  }
  //handles changes to the search term, will filter and display the filtered results.
  handleUpdates(e){
    let tempSearch = e.target.value
    let tempResults = this.state.employees.filter(employee => employee.name.includes(tempSearch)?true:employee.phone.toString().includes(tempSearch)?true:employee.title.includes(tempSearch)?true:employee.email.includes(tempSearch)?true:false)
    this.setState({searchTerm : tempSearch, filteredEmployees: tempResults})
  }
  //clears the filter completely
  clear(){
    this.setState({searchTerm : '', filteredEmployees: this.state.employees})
  }
  render() {
    return (
      <div>
        <ul className="listContainer">
        <li name='searchEmployee' className="listText" key='-1'>
          <input type='text' name='searchBox' value={this.state.searchTerm} placeholder='Search Employees' onChange={e=>this.handleUpdates(e)} /><button name='clearSearch' onClick={this.clear}>Clear</button>
        </li>
          { 
            this.state.filteredEmployees.map((employee) => {
              return (
                <li name={'employee' + employee.id} className="listText" key={employee.id} onClick={ () => { this.props.selectEmployee(employee) }}> { employee.name } </li>
              )
            })
          }
          <li name='addEmployee' className="listText" key='0' onClick={()=>{this.props.addEmployee()}}><strong> Add Employee </strong> </li>
        </ul>
      </div>
    )
  }
}

export default EmployeeList;