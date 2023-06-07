import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SignupCompleteComponent } from './signup-complete.component';

describe('SignupCompleteComponent', () => {
  let component: SignupCompleteComponent;
  let fixture: ComponentFixture<SignupCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SignupCompleteComponent,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    });
    fixture = TestBed.createComponent(SignupCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message when signup failed', () => {
    component.error = 'Error: unexpected error occured';
    fixture.detectChanges();
    const title = fixture.debugElement.query(
      By.css('#registration-failed-title')
    );
    expect(title.nativeElement.innerHTML.trim()).toEqual(
      'registrationFailedTitle'
    );
    const message = fixture.debugElement.query(
      By.css('#registration-failed-message')
    );
    expect(message.nativeElement.innerHTML.trim()).toEqual(
      'registrationFailedMessage'
    );
  });

  it('should show a success message when signup succeed', () => {
    component.error = '';
    component.firstName = 'John';
    fixture.detectChanges();
    const title = fixture.debugElement.query(
      By.css('#registration-done-title')
    );
    expect(title.nativeElement.innerHTML.trim()).toEqual(
      'registrationDoneTitle'
    );

    const message = fixture.debugElement.query(
      By.css('#registration-done-message')
    );
    expect(message.nativeElement.innerHTML.trim()).toEqual(
      'registrationDoneMessage'
    );

    // unhappy flow check
    const failedDoesNotExist = fixture.debugElement.query(
      By.css('#registration-failed-title')
    );
    expect(failedDoesNotExist).toBeNull();
  });
});
