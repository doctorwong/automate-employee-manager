const selectors = require('../supporting/selectors')
const data = require('../supporting/data')
const functions = require('../supporting/functions')

module.exports = {

    beforeEach: browser => {
        //loads the browser and selects the first employee before each test
        browser
            .url('http://localhost:3000')
            .click("[name='employee1']")
    },

    after: browser => {
        //closes the browser after each test
        browser.end();
    },
    
    'User Interface Test': browser => {
        //See QW-97
        //checks elements for visibility
        functions.checkVisibile(browser, selectors.displays)
        functions.checkVisibile(browser, selectors.inputs)
        functions.checkVisibile(browser, selectors.employeeProfiles)
    },

    'Employee Link Test': browser => {
        //See QW-104
        //checks that clicking each employee will bring their file up in the editor

        for (let i = 0; i < selectors.employeeProfiles.length; i++) {
            browser
                .click(selectors.employeeProfiles[i])
                .verify.containsText('p[name = "employeeName"]', data.employees[i]['name'])
        };
    },

    'Name Field Inputs Test': browser => {
        //QW-106
        //verifies that an error message appears when the name field is longer than 30 characters
        //checks the input foo; should validate
        functions.setValue(browser, selectors.inputs[0], data.validData[0])
        browser
            .click(selectors.saveButton)
            .verify.elementNotPresent(selectors.errorCard);

        //verifies a name with a space
        functions.setValue(browser, selectors.inputs[0], 'John Doe')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[0], 'John Doe')

        //verifies a name with a number
        functions.setValue(browser, selectors.inputs[0], 'John 22')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[0], 'John 22')
        
        //verifies a name with a special character
        functions.setValue(browser, selectors.inputs[0], 'John-22')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[0], 'John-22');

        //checks a input too long

        functions.setValue(browser, selectors.inputs[0], data.tooLong)
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.nameError);

        //verifies an error message appears with three blank spaces
        /*BUG
        functions.setValue(browser, selectors.inputs[0], '   ')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.nameError);
            */
    },

    'Phone Number Field Test': browser => {
        //QW-107
        //1.3 - Test phone number in 1234567890 format
        functions.setValue(browser, selectors.inputs[1], '1234567890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '1234567890')

        //1.3 - Tests phone number in 123-456-7890 format
        functions.setValue(browser, selectors.inputs[1], '123-456-7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '123-456-7890')

        //1.3 - Tests phone number in (123)456-7890 format
        functions.setValue(browser, selectors.inputs[1], '(123)456-7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '(123)456-7890')

        //1.3 - Tests phone number in (123) 456-7890 format
        functions.setValue(browser, selectors.inputs[1], '(123) 456-7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '(123) 456-7890')

        //1.3 - Tests phone number in 123 456 7890 format
        functions.setValue(browser, selectors.inputs[1], '123 456 7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '123 456 7890')

        //1.3 - Tests phone number in 123.456.7890 format
        functions.setValue(browser, selectors.inputs[1], '123.456.7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '123.456.7890')

        //verifies that an error message appears for an international phone number
        functions.setValue(browser, selectors.inputs[1], '+91 (123) 456-7890')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[1], '+91 (123) 456-7890')

        //verifies that an error message appears when the phone number field is entered with non-numeric characters
        functions.setValue(browser, selectors.inputs[1], 'abcabcabcd')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);

        //verifies that an error message appears when the phone number field is less than ten digits long
        functions.setValue(browser, selectors.inputs[1], '123123123')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);

        /* BUG
        //verifies that an error message appears when the phone number field is greater than ten digits long
        functions.setValue(browser, selectors.inputs[1], '12312312345')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);
            */

        //verifies an error message appears with three blank spaces
        functions.setValue(browser, selectors.inputs[1], '   ')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);

        //checks for invalid special characters
        functions.setValue(browser, selectors.inputs[1], '!@?$%^&*<>')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);

        //checks dashes in wrong places
        functions.setValue(browser, selectors.inputs[1], '-12345-67890-')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.phoneError);
    },

    'Title Field Test': browser => {
        //See QW-108
        //verifies form is saved if a valid input is submitted
        functions.setValue(browser, selectors.inputs[2], 'Trombone')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[2], 'Trombone')

        //verifies form is saved if there is a space between words
        functions.setValue(browser, selectors.inputs[2], 'Third Trombone')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[2], 'Third Trombone')
        
        //verifies a title with numbers mixed with numbers
        functions.setValue(browser, selectors.inputs[2], '3rd Trombone')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[2], '3rd Trombone')

        //verifies a title with numbers mixed with special characters
        functions.setValue(browser, selectors.inputs[2], '3rd-Trombone')
        browser
            .click(selectors.saveButton)
            .verify.valueContains(selectors.inputs[2], '3rd-Trombone')
            //.verify.containsText(selectors.errorCard, data.titleError);

        //verifies that an error message appears when the title field is greater than 30 digits long
        functions.setValue(browser, selectors.inputs[2], data.tooLong)
        browser.click(selectors.saveButton)
        browser.verify.containsText(selectors.errorCard, data.titleError);

        /* BUG
        //verifies error message for submission with three blank spaces
        functions.setValue(browser, selectors.inputs[2], '   ')
        browser
            .click(selectors.saveButton)
            .verify.containsText(selectors.errorCard, data.titleError);
        */ 
    },

    'Save Button Functionality Test': (browser) => {
        //QA-88 (Save Button Functionality Button)

        //verifies each field is changed to the new value
        functions.setAll(browser, selectors.inputs, data.validData)
        browser.click(selectors.saveButton)
        functions.validate(browser, selectors.inputs, data.validData)

        //Checks if changes persist after a user navigates to a different page.
        browser.click("[name='employee2']")
        browser.click("[name='employee1']")
        functions.validate(browser, selectors.inputs, data.validData)
    },

    'Cancel Button Functionality Test': browser => {
        //QW-89
        //verifies that the user can save employee information after submitting valid outputs.

        //changes information
        functions.setAll(browser, selectors.inputs, data.validData)
        //clicks the cancel button
        browser.click(selectors.cancelButton)
        //verifies no changes are made
        browser
            .verify.valueContains(selectors.inputs[0], data.employees[0]['name'])
            .verify.valueContains(selectors.inputs[1], data.employees[0]['phone'])
            .verify.valueContains(selectors.inputs[2], data.employees[0]['title'])
    },

    'Save and Cancel Button Accessibility Test': (browser) => {
        //See QW-103
        //check if save and cancel buttons are visible if no edits are made
        browser.verify.attributeEquals(selectors.saveButton, 'disabled', "true")
        browser.verify.attributeEquals(selectors.cancelButton, 'disabled', "true")

        //clears the existing values and enters new values
        functions.setAll(browser, selectors.inputs, data.validData)
        //checks if the buttons are visible
        functions.buttonEnabled(selectors.saveButton, browser)
        functions.buttonEnabled(selectors.cancelButton, browser)

        //checks if save button is disabled if any of the fields are empty
        functions.setAll(browser, selectors.inputs, data.validData)
        browser.click(selectors.saveButton)
        browser.clearValue(selectors.inputs[0]);
        browser.verify.attributeEquals(selectors.saveButton, 'disabled', "true")

        functions.setValue(browser, selectors.inputs[0], data.validData[0])
        browser.click(selectors.saveButton)
        browser.clearValue(selectors.inputs[1]);
        browser.verify.attributeEquals(selectors.saveButton, 'disabled', "true")

        functions.setValue(browser, selectors.inputs[1], data.validData[1])
        browser.click(selectors.saveButton)
        browser.clearValue(selectors.inputs[2]);
        browser.verify.attributeEquals(selectors.saveButton, 'disabled', "true")
    },

    'Navigating Away From Changes Without Saving Test': browser => {
        //QW-105
        //changes information
        functions.setAll(browser, selectors.inputs, data.validData)

        //navigates to a differpent page and back to the first page and checks if fields are changed
        browser
            .click("[name='employee2']")
            .click("[name='employee1']")
            .verify.valueContains(selectors.inputs[0], data.employees[0]['name'])
            .verify.valueContains(selectors.inputs[1], data.employees[0]['phone'])
            .verify.valueContains(selectors.inputs[2], data.employees[0]['title'])
    },

    'Invalid Fields Highlighted in Red Test': browser =>
    {
        //QW-119
        //checks that invalid fields are highlighted in red
        functions.setValue(browser, selectors.inputs[0], data.tooLong)
        browser
            .click(selectors.saveButton)
            browser.verify.cssClassPresent('[name = "nameEntry"]', "invalidInfo")
        
        functions.setAll(browser, selectors.inputs, data.validData)
        functions.setValue(browser, selectors.inputs[1], data.tooLong)
        browser.click(selectors.saveButton)
            browser.verify.cssClassPresent('[name = "phoneEntry"]', "invalidInfo")
        
        functions.setAll(browser, selectors.inputs, data.validData)
        functions.setValue(browser, selectors.inputs[2], data.tooLong)
        browser
            .click(selectors.saveButton)
            browser.verify.cssClassPresent('[name = "titleEntry"]', "invalidInfo")
    },

    'Add Employee Test': browser => {
        //See QW-109
        //verifies the 'Add Employee' feature adds an employee with the newEmployee values
        browser
        .click('[name="addEmployee"]')
        browser.click('[name="employee11"]')
            .verify.valueContains(selectors.inputs[0], data.newEmployee['name'])
            .verify.valueContains(selectors.inputs[1], data.newEmployee['phone'])
            .verify.valueContains(selectors.inputs[2], data.newEmployee['title'])
    },

    'Save After Error Test': browser => {
    //QW-111
    //verifies a user can save a new value after correcting an invalid valueg
        //set invaid data
        functions.setAll(browser, selectors.inputs, data.inValidData)

        //click save
        browser.click(selectors.saveButton)

            //verify an error message appears
            .verify.containsText(selectors.errorCard, data.titleError);

        //clears invalid data and replaces it with valid data
        functions.setAll(browser, selectors.inputs, data.validData)

        //click save
        browser.click(selectors.saveButton)

        //verify the new data is saved
        functions.validate(browser, selectors.inputs, data.validData)
    },

    'Employee Information Test': browser => {
        //verifies that correct employee information is displayed
        for (let i = 0; i < selectors.employeeProfiles.length; i++) {
            browser
                .click(selectors.employeeProfiles[i])
                .verify.valueContains(selectors.inputs[0], data.employees[i]['name'])
                .verify.valueContains(selectors.inputs[1], data.employees[i]['phone'])
                .verify.valueContains(selectors.inputs[2], data.employees[i]['title'])
                .verify.containsText(selectors.employeeID, data.employees[i]['id'])
        }
    }
}
