import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SignupApiService } from 'src/app/services';
import { SignupCompleteComponent } from '../signup-complete';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let mockSignupApiService = jasmine.createSpyObj(['addUser']);

  let fixture: ComponentFixture<SignupFormComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SignupFormComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'signup-complete', component: SignupCompleteComponent },
        ]),
      ],
    });

    TestBed.overrideProvider(SignupApiService, {
      useValue: mockSignupApiService,
    });

    fixture = TestBed.createComponent(SignupFormComponent);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a spinner when form submitted', () => {
    component.loading = true;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('#loading-spinner'));
    expect(loader).toBeDefined();
  });

  it('should show firstname required validation', () => {
    component.formSubmitted = true;
    component.loading = false;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('#loading-spinner'));
    expect(loader).toBeNull();
    const firstNameRequired = fixture.debugElement.query(
      By.css('#firstname-required')
    );
    expect(firstNameRequired.nativeElement.innerHTML).toEqual('requiredField');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should show lastname required validation', () => {
    component.formSubmitted = true;
    component.loading = false;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('#loading-spinner'));
    expect(loader).toBeNull();
    const lastnameRequired = fixture.debugElement.query(
      By.css('#lastname-required')
    );
    expect(lastnameRequired.nativeElement.innerHTML).toEqual('requiredField');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should show email validation', () => {
    component.formSubmitted = true;
    component.loading = false;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('#loading-spinner'));
    expect(loader).toBeNull();
    const emailValidity = fixture.debugElement.query(By.css('#email-validity'));
    expect(emailValidity.nativeElement.innerHTML).toEqual('validEmailField');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should correctly validate the complete form', () => {
    component.formSubmitted = true;
    component.loading = false;
    component.firstNameControl?.setValue('MyFirstName');
    component.lastNameControl?.setValue('MyLastName');
    component.emailControl?.setValue('my@mail.com');
    component.signupForm
      .get('passwordGroup')
      ?.get('password')
      ?.setValue('MyStrongPW123');
    component.signupForm
      .get('passwordGroup')
      ?.get('repeatPassword')
      ?.setValue('MyStrongPW123');

    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('#loading-spinner'));
    const emailValidity = fixture.debugElement.query(By.css('#email-validity'));
    const lastnameRequired = fixture.debugElement.query(
      By.css('#lastname-required')
    );
    const firstNameRequired = fixture.debugElement.query(
      By.css('#firstname-required')
    );

    expect(loader).toBeNull();
    expect(emailValidity).toBeNull();
    expect(firstNameRequired).toBeNull();
    expect(lastnameRequired).toBeNull();
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should route the user to a signup complete page with a success message when user is succesfully registered', () => {
    // given
    mockSignupApiService.addUser.and.returnValue(
      of({
        firstName: 'MyFirstName',
        lastName: 'MyLastName',
        email: 'myname@fedex.com',
      })
    );

    const navigateSpy = spyOn(router, 'navigate');

    component.firstNameControl?.setValue('MyFirstName');
    component.lastNameControl?.setValue('MyLastName');
    component.emailControl?.setValue('my@mail.com');
    component.signupForm
      .get('passwordGroup')
      ?.get('password')
      ?.setValue('MyStrongPW123');
    component.signupForm
      .get('passwordGroup')
      ?.get('repeatPassword')
      ?.setValue('MyStrongPW123');

    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/signup-complete'], {
      queryParams: { firstName: 'MyFirstName' },
    });
  });

  it('should route the user to a signup complete page with an error message when something went wrong', () => {
    mockSignupApiService.addUser.and.returnValue(
      throwError(() => new Error('something went wrong!'))
    );

    // given
    const navigateSpy = spyOn(router, 'navigate');

    component.firstNameControl?.setValue('MyFirstName');
    component.lastNameControl?.setValue('MyLastName');
    component.emailControl?.setValue('my@mail.com');
    component.signupForm
      .get('passwordGroup')
      ?.get('password')
      ?.setValue('MyStrongPW123');
    component.signupForm
      .get('passwordGroup')
      ?.get('repeatPassword')
      ?.setValue('MyStrongPW123');

    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/signup-complete'], {
      queryParams: { error: new Error('something went wrong!') },
    });
  });
});
