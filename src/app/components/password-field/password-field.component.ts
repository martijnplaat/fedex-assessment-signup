import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true,
    },
  ],
})
export class PasswordFieldComponent implements ControlValueAccessor {
  @Input() name: string;

  public inputType = 'password';
  public formControl: FormControl = new FormControl();

  private destroy$ = new Subject();

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onShowHidePasswordFormControl(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  public writeValue(value: any) {
    this.formControl.setValue(value);
  }

  public registerOnChange(fn: Function) {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => fn(val));
  }

  public registerOnTouched(fn: Function) {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => fn(val));
  }
}
