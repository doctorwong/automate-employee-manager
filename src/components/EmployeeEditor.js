import React, { Component } from 'react';

class EmployeeEditor extends Component {
  constructor() {
    super();
    this.state = {
      blank: true,
      employee: null,
      originalEmployee: null,
      notModified: true
    };

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.selected === null)
      this.setState({ blank: true })
    else{
      this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected, notModified: true });
      this.setState({ blank: false})
    }
  }

  handleChange(prop, val) {
    if (this.state.notModified) {
      this.setState({ notModified: false });
    }

    var employeeCopy = Object.assign({}, this.state.employee);
    employeeCopy[prop] = val;
    this.setState({ employee: employeeCopy });
  }

  save() {
    this.state.originalEmployee.updateName(this.state.employee.name);
    this.state.originalEmployee.updatePhone(this.state.employee.phone);
    this.state.originalEmployee.updateTitle(this.state.employee.title);
    this.state.originalEmployee.updateEmail(this.state.employee.email);
    this.state.originalEmployee.displayAlert();
    this.setState({ notModified: true });
    this.props.refreshList();
  }

  cancel() {
    var employeeCopy = Object.assign({}, this.state.originalEmployee);
    this.setState({ employee: employeeCopy, notModified: true });
  }

  render() {
    return (
      <div className='infoCard'>
        {
          !this.state.blank
            ?
            <div>
              <span name='employeeID' id='employeeID'> ID: {this.state.employee.id} </span>
              <p name='employeeName' id='employeeTitle'> {this.state.originalEmployee.name} </p>
              <br />
              <button name='save' id='saveBtn' className='confirmationButton' disabled={this.state.notModified} onClick={this.save}> Save </button>
              <button name='cancel' className='neutralButton' disabled={this.state.notModified} onClick={this.cancel}> Cancel </button>
              <button name='delete' className='neutralButton' disabled={!this.state.notModified} onClick={() => { this.props.deleteEmployee(this.state.employee) }}> Delete </button>
              <br />
              <span name='nameLabel' className='placeholderText'> Name </span>
              <input name='nameEntry' className='materialInput' value={this.state.employee.name} onChange={(e) => { this.handleChange('name', e.target.value) }}></input>
              <span name='phoneLabel' className='placeholderText'> Phone Number </span>
              <input name='phoneEntry' className='materialInput' value={this.state.employee.phone} onChange={(e) => { this.handleChange('phone', e.target.value) }}></input>
              <span name='emailLabel' className='placeholderText'> Email Address </span>
              <input name='emailEntry' className='materialInput' value={this.state.employee.email} onChange={(e) => { this.handleChange('email', e.target.value) }}></input>
              <span name='titleLabel' className='placeholderText'> Title </span>
              <input name='titleEntry' className='materialInput' value={this.state.employee.title} onChange={(e) => { this.handleChange('title', e.target.value) }}></input>
            </div>
            :
            <p id='noEmployee'> No Employee Selected </p>
        }

      </div>
    )
  }
}

export default EmployeeEditor;