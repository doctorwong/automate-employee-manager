const data = require('./data.js')
const selectors = require('./selectors.js')

module.exports = {

    buttonEnabled: (button, browser) => {
        //Checks if a specified button is enabled and can  be clicked
        browser.getAttribute(button, 'disabled', result => {
            browser.verify.ok(result.value == null, 'Testing if button is visible')
        })
    },

    checkVisibile: (browser, selectors) => {
        //Checks for visibility for the specified selectors
        selectors.forEach(display => {
            browser.verify.visible(display)
        });
    },

    setAll: (browser, selectors, data) =>
    //Takes an array of fields and an array of corresponding data of the same length
    //Clears pre-existing data in those fields and replaces them with data given
    {
        for (let i = 0; i < selectors.length; i++) {
            browser
                .clearValue(selectors[i])
                .setValue(selectors[i], data[i])
        }
    },

    setValue: (browser, selector, data) =>
    //Takes a field and the corresponding data for that field
    //Clears any pre-existing data in that field, replaces it with data given, and clicks submit
    {
        browser
            .clearValue(selector)
            .setValue(selector, data)
    },

    validate: (browser, selectors, data) => {
        //Takes a field and the data the field should contain
        //Verifies if the data in the field matches the data input.
        for (let i = 0; i < selectors.length; i++) {
            browser.verify.valueContains(selectors[i], data[i])
        }
    }
}