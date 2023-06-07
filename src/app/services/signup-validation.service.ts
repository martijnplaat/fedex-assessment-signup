import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SignupValidationService {
  public upperLowerCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase;

      return !passwordValid ? { hasUpperCaseLowerCase: true } : null;
    };
  }

  public firstnameOrLastNameValidator(
    firstName$: BehaviorSubject<string>,
    lastName$: BehaviorSubject<string>
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase();

      const lastName = lastName$.getValue()?.toLocaleLowerCase();
      const firstName = firstName$.getValue()?.toLocaleLowerCase();

      if (!value) {
        return null;
      }

      const hasFirstName = !!firstName && value.includes(firstName);
      const hasLastName = !!lastName && value.includes(lastName);
      const hasFirstNameOrLastName = hasFirstName || hasLastName;

      return hasFirstNameOrLastName ? { hasFirstNameOrLastName: true } : null;
    };
  }

  public passwordMatchValidator() {
    return (controls: AbstractControl) => {
      const passwordControl = controls.get('password');
      const repeatPasswordControl = controls.get('repeatPassword');

      if (!passwordControl || !repeatPasswordControl) {
        return null;
      }

      if (
        repeatPasswordControl.errors &&
        !repeatPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== repeatPasswordControl.value) {
        repeatPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        repeatPasswordControl.setErrors(null);
      }

      return null;
    };
  }
}
