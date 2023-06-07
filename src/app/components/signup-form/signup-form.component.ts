import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignupValidationService } from 'src/app/services';
import { PasswordFieldContainerComponent } from '../password-field-container';
import { SignupApiService } from 'src/app/services';
import { User, UserResponse } from './signup-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    PasswordFieldContainerComponent,
  ],
  providers: [SignupValidationService, SignupApiService],
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent {
  constructor(
    private fb: FormBuilder,
    private signupApi: SignupApiService,
    private router: Router
  ) {}

  public formSubmitted = false;
  public loading = false;
  public signupForm: FormGroup;

  public ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: [],
        repeatPassword: [],
      }),
    });
  }

  public onSubmit(): void {
    this.formSubmitted = true;

    if (this.signupForm.valid) {
      const user: User = {
        firstName: 'john',
        lastName: 'west',
        email: 'john@west.com',
      };

      this.loading = true;
      this.signupApi.addUser(user).subscribe({
        next: (addUserResponse: UserResponse) => {
          this.loading = false;
          this.router.navigate(['/signup-complete'], {
            queryParams: { firstName: addUserResponse.firstName },
          });
        },
        error: (message: string) => {
          this.router.navigate(['/signup-complete'], {
            queryParams: { error: message },
          });
          this.loading = false;
        },
      });
    }
  }

  public get firstNameControl() {
    return this.signupForm.get('firstName');
  }

  public get lastNameControl() {
    return this.signupForm.get('lastName');
  }

  public get emailControl() {
    return this.signupForm.get('email');
  }
}
