const data = require('./data.js')
const selectors = require('./selectors.js')

module.exports = {
    setValidData: (browser, selectors) =>
    {
        browser.clearValue(selectors.nameEntry)
        browser.setValue(selectors.nameEntry, data.validName)
        browser.clearValue(selectors.phoneEntry)
        browser.setValue(selectors.phoneEntry, data.validPhone)
        browser.clearValue(selectors.titleEntry)
        browser.setValue(selectors.titleEntry, data.validTitle)
    }
}