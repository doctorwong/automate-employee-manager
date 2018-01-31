<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project we are building a front end for an employee management system.  It should run on any modern browser (post I.E. 8 and similar), and be fully functional, and reasonably styled.  Chrome will be our recommended browser.

## Current Desired Functionality

The application will load a simulated list of employees, and allow modifications to each.  Clicking the employee from the list to the side will bring their file up in the editor.  Your employee will consist of:

* ID        (Whole, positive, and unique number)
* Name      (1-30 characters long)
* Phone     (10 digits in length)
* Title     (1-30 characters long)

All fields except for ID are editable.  When saving a change, it will persist as you access other records and navigate back to the desired employee.  The save and cancel buttons will only be accessible when modifications have been made, and the cancel button will revert the employee's file back to the most recently saved version.  Every editable field must be populated to save.

* Note - while it would be possible to check the name or title fields for special characters, enough special characters *should* be allowed that it would be impractical to only check for a few, and exhaustively difficult to list ALL the characters that should *not* be allowed.

## Change Log for Version 1.3

* Added `name` properties to the field labels, to make them easier to check in automation.
* Undocumented change for Version 1.2, added version tracker to the bottom of the screen
* Phone numbers accepted in any of the following formats:
> 1234567890
> 123-456-7890
> (123)456-7890
> (123) 456-7890
> 123 456 7890
> 123.456.7890
> +91 (123) 456-7890
> Error Message: 'The phone number must be a valid 10 digit US number.'
* Fixed title field validation for lengths longer than 30 characters, also no longer tracks error for title field when NAME is longer than 30 characters.
* The save button is disabled when any field is empty.
* Empty fields are highlighted in red (unless the cursor is still in that field)

## Future Functionality

To be aware of, but not currently implemented (items recently added to the list are **bold**, recently implemented are ~crossed out~)

* ~Phone numbers will be validated 10 digit, area code included, US phone numbers.~
* The Employee List will reside in a database and be accessed through API integration
* A Remove Employee function will be implemented
* A search function to filter the employee list will be available, based on Job Title, Name, and/or ID
* An Email Address field will be added for each employee file

## Disclosure

This is not an ACTUAL business project - but a project plan to assist Quality Assurance Engineers in their training.  Full documentation on the assignment requirements is available in JIRA.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>