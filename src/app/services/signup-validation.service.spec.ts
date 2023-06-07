import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { SignupValidationService } from './signup-validation.service';

describe('SignupValidationService', () => {
  let service: SignupValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupValidationService],
    });
    service = TestBed.inject(SignupValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('upperLowerCaseValidator', () => {
    it('should invalidate the password when the value does not contain a lowercase character', () => {
      expect(
        service.upperLowerCaseValidator()(new FormControl('ONLYUPPERCASE'))
      ).toEqual({ hasUpperCaseLowerCase: true });
    });

    it('should invalidate the password when the value does not contain an uppercase character', () => {
      expect(
        service.upperLowerCaseValidator()(new FormControl('onlylowercase'))
      ).toEqual({ hasUpperCaseLowerCase: true });
    });

    it('should validate when the password contains uppercase and lowercase characters', () => {
      expect(
        service.upperLowerCaseValidator()(
          new FormControl('UpperCaseAndLowerCase')
        )
      ).toEqual(null);
    });
  });

  describe('firstnameOrLastNameValidator', () => {
    it('should invalidate the password when the value contains the firstname value', () => {
      expect(
        service.firstnameOrLastNameValidator(
          new BehaviorSubject('John'),
          new BehaviorSubject('Doe')
        )(new FormControl('PasswordWithJohn'))
      ).toEqual({ hasFirstNameOrLastName: true });
    });

    it('should invalidate the password when the value contains the lastname value', () => {
      expect(
        service.firstnameOrLastNameValidator(
          new BehaviorSubject('John'),
          new BehaviorSubject('Doe')
        )(new FormControl('PasswordWithDoe'))
      ).toEqual({ hasFirstNameOrLastName: true });
    });

    it('should validate the password when the value not contains the firstname and/or lastname', () => {
      expect(
        service.firstnameOrLastNameValidator(
          new BehaviorSubject('John'),
          new BehaviorSubject('Doe')
        )(new FormControl('Password123'))
      ).toEqual(null);
    });
  });

  describe('passwordMatchValidator', () => {
    it('should validate password when the value is equal to the repeated password value', () => {
      expect(
        service.passwordMatchValidator()(
          new FormGroup({
            password: new FormControl('Welcome123'),
            repeatPassword: new FormControl('Welcome123'),
          })
        )
      ).toEqual(null);
    });
  });
});
