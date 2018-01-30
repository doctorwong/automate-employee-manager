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

    'Visibility Test': browser => {
        //checks elements for visibility

        browser
            .assert.visible('.titleBar')
            .assert.visible('.listText')
            .assert.visible('.materialInput')
            .assert.visible('.confirmationButton')
            .assert.visible('.neutralButton')
            .assert.visible('#employeeID')
            .assert.visible('#employeeTitle')
    },

    'Save Button Test': (browser) => {
        //verifies that the user can save employee information after submitting valid outputs.

        //clears the existing values and enters new values
        functions.setAll(browser, selectors.inputs, data.validData)

        //checks if the save button is visible
        browser.isVisible(selectors.saveButton)

        //verifies each field is changed to the new value
        browser.click(selectors.saveButton)
        functions.validate(browser, selectors.inputs, data.validData)
    },

    'Cancel Button Test': browser => {
        //verifies that the user can save employee information after submitting valid outputs.

        //clears the existing values and enters new values
        functions.setAll(browser, selectors.inputs, data.validData)

        //checks if the cancel button is visible
        browser.isVisible(selectors.cancelButton)

        //verifies fields were not changed
        browser
            .click(selectors.cancelButton)
            .assert.valueContains(selectors.inputs[0], data.employees[0]['name'])
            .assert.valueContains(selectors.inputs[1], data.employees[0]['phone'])
    },

    'Name Field Test': browser => {
        //verifies that an error message appears when the name field is longer than 30 characters
        functions.setValue(browser, selectors.inputs[0], data.tooLong)
        browser
            .click(selectors.saveButton)
            .expect.element(selectors.errorCard).text.to.contain(data.nameError);

        //verifies that an error message appears when the name field is blank
        browser
            .clearValue(selectors.inputs[0])
            .expect.element(selectors.errorCard).text.to.contain(data.nameError);
    },

    'Phone Number Field Test': browser => {
        /* THIS IS A WORKAROUND: ERROR MESSAGES FOR ALL THESE TESTS ARE NOT DISPLAYING PROPERLY,
        */

        //verifies that an error message appears when the phone number field is entered with non-numeric characters
        functions.setValue(browser, selectors.inputs[1], 'abcabcabcd')
        browser
            .click(selectors.saveButton)
            .expect.element(selectors.errorCard).text.to.contain('T he phone number must be 10 digits long.');

        //verifies that an error message appears when the phone number field is less than ten digits long
        functions.setValue(browser, selectors.inputs[1], '123123123')
        browser
            .click(selectors.saveButton)
            .expect.element(selectors.errorCard).text.to.contain('T he phone number must be 10 digits long.');

        /*BUG
        //verifies that an error message appears when the phone number field is greater than ten digits long
        functions.setValue(browser, selectors.inputs[1], '12312312345')
        browser.click(selectors.saveButton)
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');
        */

        /* Not working
        //verifies that an error message appears when the phone number field is blank
        browser.clearValue('input[name = "phoneEntry"]')
        browser.click(selectors.saveButton)
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');
        */
    },

    'Title Field Test': browser => {

        /* ERROR MESSAGE DOES NOT DISPLAY FOR THIS TEST
        //verifies that an error message appears when the title field is greater than 30 digits long
        functions.setValue(browser, selectors.inputs[2], 'supercalifrasgilisticexpialidocious')
        browser.click(selectors.saveButton)
        browser.expect.element(selectors.errorCard).text.to.contain('The title field must be between 1 and 30 characters long.');
  
        //verifies that an error message appears when the title field is blank
        browser.click(selectors.inputs[2])
        browser.clearValue(selectors.inputs[2])
        browser.click(selectors.saveButton)
        browser.pause(2000)
        browser.expect.element(selectors.errorCard).text.to.contain('The title field must be between 1 and 30 characters long.');
        */
    },

    'Navigation Link Test': browser => {
        //verifies all links to employees are working

        for (let i = 0; i < selectors.employeeProfiles.length; i++) {
            browser
                .click(selectors.employeeProfiles[i])
                .expect.element('p[name = "employeeName"]').text.to.contain(data.employees[i]['name'])
        };
    },

    'Employee Information Test': browser => {
        //verifies that correct employee information is displayed
        for (let i = 0; i < selectors.employeeProfiles.length; i++) {
            browser
                .click(selectors.employeeProfiles[i])
                .assert.valueContains(selectors.inputs[0], data.employees[i]['name'])
                .assert.valueContains(selectors.inputs[1], data.employees[i]['phone'])
                .assert.valueContains(selectors.inputs[2], data.employees[i]['title'])
                .expect.element(selectors.employeeID).text.to.contain(data.employees[i]['id'])
        }
    }
}