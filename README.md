<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project we are building a front end for an employee management system.  It should run on any modern browser (post I.E. 8 and similar), and be fully functional, and reasonably styled.  Chrome will be our recommended browser.

## Current Desired Functionality

### Employee List

The application will load a simulated list of employees, and allow modifications to each.  Clicking the employee from the list to the side will bring their file up in the editor.

#### Add Employee

"Add Employee" option at the bottom will allow a new employee record to be created, defaulting with the name and title "New Employee", phone number (111)111-1111, and an ID number one greater than the last employee created, so that IDs are never repeated.

### Selected Employee

Your employee will consist of:

* ID
* Name
* Phone
* Title

All fields except for ID are editable.  

*ID* - Should be whole numbers between 0 and 9999
*Name* - Any characters allowed, to a maximum of 30 characters
*Phone* - Must be a 10 digit phone number
* Accepted as regular digits or formatted as a US number
* If entered as the former will be displayed as the latter
*Title* - Any characters allowed, to a maximum of 30 characters
*Email* - Any valid email address, to a maximum of 30 characters

#### Save, Cancel, Delete

*Save*: When saving a change, it will persist as you access other records and navigate back to the desired employee.
* If there are unacceptable entries in the fields, an error message will pop up advising the users as to the errors they need to fix.
*Cancel*: The cancel button will revert the employee's file back to the most recently saved version.
*Delete*: The delete button will remove the employee record, and is irriversable.  A dialogue asking the user to confirm their desire to remove the record will be presented.

The save and cancel buttons will only be accessible when modifications have been made.

#### Search

* The search bar will compare any inputs to all fields on all employees, and filter the employee list for any employee that has at least one match.
* The clear button will empty the search field and revert to display ALL employees.
* Adding, modifying, or deleting employees while the search field is populated will update the results.

## Future Functionality

To be aware of, but not currently implementedgit 

* ~~Phone numbers will be validated 10 digit, area code included, US phone numbers.~~
* The Employee List will reside in a database and be accessed through API integration.
* ~~An Add Employee function will be implemented.~~
* ~~A search function to filter the employee list will be available, based on Job Title, Name, and/or ID~~
* ~~An Email Address field will be added for each employee file~~
* ~~All fields will be required for any entry/modification~~

## Disclosure

This is not an ACTUAL business project - but a project plan to assist Quality Assurance Engineers in their training.  Full documentation on the assignment requirements is available in JIRA.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>