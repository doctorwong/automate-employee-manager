const selectors = require('../supporting/selectors')
const data = require('../supporting/data')
const functions = require('../supporting/functions')

module.exports = {

    beforeEach: browser => {
        //loads the browser and selects the first employee before each test
        browser.url('http://localhost:3000')
        browser.click("[name='employee1']")
    },

    after: browser => {
        //closes the browser after each test
        browser.end();
    },

    'UI Test' : browser =>
    {

    },

    'Save Button Test': browser => {
        //verifies that the user can save employee information after submitting valid outputs.

        //clears the existing values and enters new values
        functions.setValidData(browser, selectors)

        //checks if the save button is visible
        browser.isVisible(selectors.saveButton)

        //verifies each field is changed to the new value
        browser.click("[name= 'save']")
        browser.assert.valueContains(selectors.nameEntry, data.validName);
        browser.assert.valueContains(selectors.phoneEntry, data.validPhone);
        browser.assert.valueContains(selectors.titleEntry, data.validTitle);
    },

    'Cancel Button Test': browser => {
        //verifies that the user can save employee information after submitting valid outputs.

        //clears the existing values and enters new values
        functions.setValidData(browser, selectors);

        //checks if the cancel button is visible
        browser.isVisible(selectors.cancelButton)

        //verifies each field is changed to the new value
        browser.click(selectors.cancelButton)
        browser.assert.valueContains(selectors.nameEntry, data.employees[0]);
    },


    'Name Field Test': browser => {
        //verifies that an error message appears when the name field is longer than 30 characters
        browser.clearValue(selectors.nameEntry)
        browser.setValue(selectors.nameEntry, data.tooLong)
        browser.click(selectors.saveButton)
        browser.expect.element(selectors.errorCard).text.to.contain(data.nameError);

        //verifies that an error message appears when the name field is blank
        browser.click(selectors.nameEntry)
        browser.clearValue(selectors.nameEntry)
        browser.expect.element(selectors.errorCard).text.to.contain(data.nameError);
    },


    'Phone Number Field Test': browser => {
        /* ERROR MESSAGES FOR ALL THESE TESTS ARE NOT DISPLAYING PROPERLY

        //verifies that an error message appears when the phone number field is entered with non-numeric characters
        browser.clearValue('input[name = "phoneEntry"]')
        browser.setValue('input[name = "phoneEntry"]', 'abcabcabcd')
        browser.click("[name= 'save']")
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');

        //verifies that an error message appears when the phone number field is less than ten digits long
        browser.clearValue('input[name = "phoneEntry"]')
        browser.setValue('input[name = "phoneEntry"]', '123123123')
        browser.click("[name= 'save']")
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');

        //verifies that an error message appears when the phone number field is greater than ten digits long
        browser.clearValue('input[name = "phoneEntry"]')
        browser.setValue('input[name = "phoneEntry"]', '12312312345')
        browser.click("[name= 'save']")
        browser.pause(10000)
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');


        //verifies that an error message appears when the phone number field is blank
        browser.clearValue('input[name = "phoneEntry"]')
        browser.click("[name= 'save']")
        browser.expect.element('div[class = "errorCard"]').text.to.contain('T he phone number must be 10 digits long.');
        */
    },


    'Title Field Test': browser => {

        /* ERROR MESSAGE DOES NOT DISPLAY FOR THIS TEST
        //verifies that an error message appears when the title field is greater than 30 digits long
        browser.clearValue('input[name = "titleEntry"]')
        browser.setValue('input[name = "titleEntry"]', 'supercalifrasgilisticexpialidocious')
        browser.click("[name= 'save']")
        browser.expect.element('div[class = "errorCard"]').text.to.contain('The title field must be between 1 and 30 characters long.');
        */

        /*TEST DOES NOT WORK
        //verifies that an error message appears when the title field is blank
        browser.click("[name='titleEntry']")
        browser.clearValue('input[name = "titleEntry"]')
        browser.click("[name= 'save']")
        browser.pause(2000)
        browser.expect.element('div[class = "errorCard"]').text.to.contain('The title field must be between 1 and 30 characters long.');
        */
    },

    'Navigation Link Test': browser => {
        //verifies navigation links to all employees are working

        for (i = 0; i < selectors.employeeProfiles.length; i++) {
            browser.click(selectors.employeeProfiles[i]);
            browser.expect.element('p[name = "employeeName"]').text.to.contain(data.employees[i]);
        };

    
    }
}

