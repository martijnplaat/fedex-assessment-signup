# Fedex Assessment Signup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Code decisions for this signup form

- Separated the form into three parts;
  - a password-field component which has some show/hide complexity
  - a password-field-container component which is responsible for validating the two implemented password fields
  - a main signup-form which contains the name and email fields
- The password-field-container uses `FormGroupDirective` to refer to the parent form, and thereby integrate this password-field-container as a child form with the parent form and keep the validation code within the container.
- The password-field component is also a standalone form control and we use `NG_VALUE_ACCESSOR` to integrate with the parent form.
- Two separate services; a `signup-api.service` that is responsible for submitting the signup form and `signup-validation.service` that is responsible for validating the form fields.
- For now we have one route after finishing the signup. Based on query params we either show a succes page or a failed page.
- Password is send in plaintext. Sending a password as a hash value to the back-end is also considered as a bad practice. Because the connection is based on HTTPS this solution is secure enough for now.
- All text in this signup form is translated with the `ngx-translate` library and only one language is supported.
- The styling of this form is done with TailwindCSS

## Production build

Run `npm run build`

## Development server

Run `npm run start` for a dev server

## Running unit tests

- Focusing on 100% coverage is a little bit too much. Therefore, I decided to not make 100% coverage for the `signup-api.service` because by testing `addUser` I basically unittest the POST method of HTTPClient, which is not really why we build a unittest in the first place. With a our e2e test we cover this method anyways.

Run `npm run test` to execute the unit tests

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests
