export default class Employee {
  constructor(id, name, phone, email, title) {
    this.id = id
    this.name = name
    this.phone = phone
    this.email = email
    this.title = title
    this.alert = ''
  }

  updateName(name) {
    if (/^.{1,30}$/.test(name))
      this.name = name;
    else
      this.alert += 'The name can only be between 1 and 30 characters long.\n'
  }

  updatePhone(phone) {
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone))
      this.phone = phone;
    else
      this.alert += 'The phone number must be a 10 digit number.\n'
  }

  updateEmail(email) {
    if (/^([a-zA-Z0-9_\-.]+){1,20}@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email))
      this.email = email;
    else
      this.alert += 'You must enter a valid email address.\n'
  }

  updateTitle(title) {
    if (/^.{1,30}$/.test(title))
      this.title = title;
    else
      this.alert += 'The title can only be 30 characters long.\n'
  }

  displayAlert() {
    if (this.alert.length > 0) {
      alert(`${this.alert}Please fix the errors and try again.`)
      this.alert = ''
    }
  }
}