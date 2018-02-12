import React, { Component } from 'react';

class EmployeeEditor extends Component {
  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true,
      fieldEmpty: false
    };

    this.nameInvalid = false;
    this.phoneInvalid = false;
    this.titleInvalid = false;

    this.errorMessage = ''

    this.formatPhoneNumber = this.save.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected, notModified: true });
    this.nameInvalid = false;
    this.phoneInvalid = false;
    this.titleInvalid = false;
    this.errorMessage = '';
  }

  handleChange(prop, val) {
    if (this.state.notModified) {
      this.setState({ notModified: false });
    }

    var employeeCopy = Object.assign({}, this.state.employee);
    // if (prop === 'phone'){
    //   let temp = val.match(/\d+/g)
    //   employeeCopy[prop] = temp?temp.length>0?temp.join(''):'':''
    // }
    // else
    employeeCopy[prop] = val;
    this.setState({ employee: employeeCopy }, () => {
      //if a field is set empty, sets the field empty property, only resets when all fields are populated
      if (this.state.employee.phone === '' || this.state.employee.name === '' || this.state.employee.title === '')
        this.setState({ fieldEmpty: true })
      else
        this.setState({ fieldEmpty: false })
    });
  }

  save() {
    if (this.validate()) {
      this.state.originalEmployee.updateName(this.state.employee.name);
      this.state.originalEmployee.updatePhone(this.state.employee.phone);
      this.state.originalEmployee.updateTitle(this.state.employee.title);
      this.setState({ notModified: true });
      this.props.refreshList();
      console.log('updatedFromValid')
    }
    else
      this.forceUpdate();
  }

  validate() {
    this.errorMessage = '';
    if (this.state.employee.name.length < 1 || this.state.employee.name.length > 30) {
      this.nameInvalid = true;
      // document.getElementsByName('nameEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The name field must be between 1 and 30 characters long. \n'
    }
    else
      this.nameInvalid = false

    /*
      Accepted phone numbers (per this regex)
      1234567890
      123-456-7890
      (123)456-7890
      (123) 456-7890
      123 456 7890
      123.456.7890
      +91 (123) 456-7890
    */
    if (!/^(\d{10})|(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}$/.test(this.state.employee.phone)) {
      this.phoneInvalid = true;
      // document.getElementsByName('titleEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The phone number must be a valid 10 digit US number. \n'
    }
    else
      this.phoneInvalid = false

    if (this.state.employee.title.length < 1 || this.state.employee.title.length > 30) {
      this.titleInvalid = true;
      // document.getElementsByName('phoneEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The title field must be between 1 and 30 characters long. \n'
    }
    else
      this.titleInvalid = false

    if (this.nameInvalid || this.titleInvalid || this.phoneInvalid) {
      console.log('invalid')
      return false
    }
    else {
      console.log('valid')
      return true
    }

  }

  formatPhoneNumber(number) {
    return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`
  }

  cancel() {
    this.nameInvalid = false;
    this.phoneInvalid = false;
    this.titleInvalid = false;
    this.errorMessage = '';
    var employeeCopy = Object.assign({}, this.state.originalEmployee);
    this.setState({ employee: employeeCopy, notModified: true });
  }

  render() {
    return (
      <div>
        <div className="infoCard">
          {
            this.state.employee
              ?
              <div>
                <span name='employeeID' id="employeeID"> ID: {this.state.employee.id} </span>
                <p name='employeeName' id="employeeTitle"> {this.state.originalEmployee.name} </p>
                <br />
                <button name='save' id="saveBtn" className="confirmationButton" disabled={this.state.notModified || this.state.fieldEmpty} onClick={this.save}> Save </button>
                <button name='cancel' className="neutralButton" disabled={this.state.notModified} onClick={this.cancel}> Cancel </button>
                <br />
                <span name='nameLabel' className="placeholderText"> Name </span>
                <input name='nameEntry' className={this.nameInvalid || this.state.employee.name === '' ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.name} onChange={(e) => { this.handleChange('name', e.target.value) }}></input>
                <span name='phoneLabel' className="placeholderText"> Phone Number </span>
                <input name='phoneEntry' className={this.phoneInvalid || this.state.employee.phone === '' ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.phone} onChange={(e) => { this.handleChange('phone', e.target.value) }}></input>
                <span name='titleLabel' className="placeholderText"> Title </span>
                <input name='titleEntry' className={this.titleInvalid || this.state.employee.title === '' ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.title} onChange={(e) => { this.handleChange('title', e.target.value) }}></input>
              </div>
              :
              <p id="noEmployee"> No Employee Selected </p>
          }

        </div>
        <div className={this.errorMessage === '' ? "hidden" : "errorCard"}>
          <span className="errorMessage"> {this.errorMessage.split('\n').map((string, i) => <div key={i}>{string}</div>)} </span>
        </div>
      </div>
    )
  }
}

export default EmployeeEditor;