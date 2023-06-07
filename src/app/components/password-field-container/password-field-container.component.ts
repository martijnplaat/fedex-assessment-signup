import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SignupValidationService } from 'src/app/services';
import { PasswordFieldComponent } from '../password-field';

@Component({
  selector: 'app-password-field-container',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordFieldComponent,
  ],
  templateUrl: './password-field-container.component.html',
})
export class PasswordFieldContainerComponent {
  constructor(
    private signupValidator: SignupValidationService,
    private rootFormGroup: FormGroupDirective
  ) {}

  @Input() formSubmitted: boolean;
  public passwordGroup: FormGroup;
  private firstName$ = new BehaviorSubject('');
  private lastName$ = new BehaviorSubject('');
  private destroy$ = new Subject();

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit() {
    this.passwordGroup = this.rootFormGroup.control.get(
      'passwordGroup'
    ) as FormGroup;

    this.rootFormGroup.control
      .get('firstName')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((firstName) => {
        this.firstName$.next(firstName);
      });

    this.rootFormGroup.control
      .get('lastName')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((lastName) => {
        this.lastName$.next(lastName);
      });

    this.passwordGroup.setValidators(
      this.signupValidator.passwordMatchValidator()
    );
    this.repeatPasswordControl?.setValidators(Validators.required);
    this.passwordControl?.setValidators(
      Validators.compose([
        Validators.required,
        this.signupValidator.upperLowerCaseValidator(),
        this.signupValidator.firstnameOrLastNameValidator(
          this.firstName$,
          this.lastName$
        ),
        Validators.minLength(8),
      ])
    );

    this.passwordControl?.updateValueAndValidity();
    this.passwordGroup.updateValueAndValidity();
    this.repeatPasswordControl?.updateValueAndValidity();
  }

  public get passwordControl() {
    return this.passwordGroup.get('password');
  }

  public get repeatPasswordControl() {
    return this.passwordGroup.get('repeatPassword');
  }
}
