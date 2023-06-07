import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PasswordFieldComponent } from './password-field.component';

describe('PasswordFieldComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordFieldComponent],
    });
    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password field from hidden to visible', () => {
    // given
    component.inputType = 'password';
    component.onShowHidePasswordFormControl();

    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.fedex-password-icon img'));

    // note: state of visible password is the hidden eye icon.
    expect(img.nativeElement.getAttribute('src')).toEqual(
      '/assets/hide-eye.svg'
    );
  });

  it('should toggle password field from visible to hidden', () => {
    // given
    component.inputType = 'text';
    component.onShowHidePasswordFormControl();

    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.fedex-password-icon img'));

    // note: state of visible password is the hidden eye icon.
    expect(img.nativeElement.getAttribute('src')).toEqual(
      '/assets/show-eye.svg'
    );
  });
});
