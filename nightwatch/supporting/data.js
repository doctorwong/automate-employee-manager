module.exports = {
    employees: [{name: "Bernice Ortiz", phone: '4824931093', title: 'CEO', id: '1'},
        {name: "Marnie Barnett", phone: '3094812387', title: 'CTO', id: '2'},
        {name: "Phillip Weaver", phone: '7459831843', title: 'Manager', id: '3'},
        {name: "Teresa Osborne", phone: '3841238745', title: 'Director of Engineering', id: '4'},
        {name: "Dollie Berry", phone: '4873459812', title: 'Front-End Developer', id: '5'},
        {name: "Harriett Williamson", phone: '6571249801', title: 'Front-End Developer', id: '6'},
        {name: "Ruby Estrada", phone: '5740923478', title: 'Back-End Developer', id: '7'},
        {name: "Lou White", phone: '8727813498', title: 'Full-Stack Developer', id: '8'},
        {name: "Eve Sparks", phone: '8734567810', title: 'Product Manager', id: '9'},
        {name: "Lois Brewer", phone: '8749823456', title: 'Sales Manager', id: '10'}],
        newEmployee: {name: "New Employee", phone: '1234567890', title: 'New Employee', id: '11'},
    validData: ['foo', '1231234567', 'foobar'],
    inValidData: ['supercalifragilisticexpialidocious', '1235678901234567890', 'supercalifragilisticexpialidocious'],
    tooLong: 'supercalifragilisticexpialidocious',
    nameError:'The name field must be between 1 and 30 characters long.',
    phoneError: 'The phone number must be a valid 10 digit US number.',
    titleError: 'The title field must be between 1 and 30 characters long.'
}