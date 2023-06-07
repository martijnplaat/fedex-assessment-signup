import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SignupValidationService } from 'src/app/services';

import { PasswordFieldContainerComponent } from './password-field-container.component';

describe('PasswordFieldContainerComponent', () => {
  let component: PasswordFieldContainerComponent;
  let fixture: ComponentFixture<PasswordFieldContainerComponent>;
  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(() => {
    const fb = new FormBuilder();

    formGroupDirective.form = fb.group({
      firstName: [],
      lastName: [],
      passwordGroup: fb.group({
        password: [],
        repeatPassword: [],
      }),
    });
    TestBed.configureTestingModule({
      imports: [PasswordFieldContainerComponent, TranslateModule.forRoot()],
      providers: [
        SignupValidationService,
        { provide: FormGroupDirective, useValue: formGroupDirective },
      ],
    });
    fixture = TestBed.createComponent(PasswordFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('password field', () => {
    it('should first show password required validation when form is submitted', () => {
      component.formSubmitted = true;
      fixture.detectChanges();

      const passwordRequired = fixture.debugElement.query(
        By.css('#password-required')
      );

      expect(passwordRequired.nativeElement.innerHTML).toEqual('requiredField');
    });

    it('should subsequently show uppercase/lowercase validation when incorrect password is given', () => {
      component.formSubmitted = true;
      component.passwordControl?.setValue('tooweak');
      fixture.detectChanges();

      const passwordRequired = fixture.debugElement.query(
        By.css('#password-uppercase-lowercase')
      );

      expect(passwordRequired.nativeElement.innerHTML).toEqual(
        'upperCaseLowerCaseInPassword'
      );
    });

    it('should subsequently show too short validation when incorrect password is given', () => {
      component.formSubmitted = true;
      component.passwordControl?.setValue('TooWeak');
      fixture.detectChanges();

      const passwordRequired = fixture.debugElement.query(
        By.css('#password-maxlength-password')
      );

      expect(passwordRequired.nativeElement.innerHTML).toEqual(
        'maxlengthPassword'
      );
    });

    it('should subsequently show validation that password contains firstname/lastname', () => {
      component.formSubmitted = true;
      formGroupDirective.form.get('firstName')?.setValue('JohnDoe');

      component.passwordControl?.setValue('JohnDoe');
      fixture.detectChanges();

      const passwordFirstNameValidator = fixture.debugElement.query(
        By.css('#password-firstname-lastname')
      );

      expect(passwordFirstNameValidator.nativeElement.innerHTML).toEqual(
        'firstNameOrlastNameInPassword'
      );
    });

    it('should subsequently show valid password field when correct password is given', () => {
      component.formSubmitted = true;
      component.passwordControl?.setValue('StrongEnough123');
      expect(component.passwordControl?.valid).toBeTruthy();
    });
  });

  describe('repeat password field', () => {
    it('should first show repeat password required validation when form is submitted', () => {
      component.formSubmitted = true;
      fixture.detectChanges();

      const repeatPasswordRequired = fixture.debugElement.query(
        By.css('#repeat-password-required')
      );

      expect(repeatPasswordRequired.nativeElement.innerHTML).toEqual(
        'requiredField'
      );
    });

    it('should show mismatch validation when repeat password not equal to password', () => {
      component.formSubmitted = true;
      component.passwordControl?.setValue('MyStrongPW123');
      component.repeatPasswordControl?.setValue('MisMatchPW123');
      fixture.detectChanges();

      const repeatPasswordMismatch = fixture.debugElement.query(
        By.css('#repeat-password-mismatch')
      );

      expect(repeatPasswordMismatch.nativeElement.innerHTML).toEqual(
        'passwordsDoesNotMatch'
      );
    });
  });
});
