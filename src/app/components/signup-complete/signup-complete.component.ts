import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup-complete',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './signup-complete.component.html',
})
export class SignupCompleteComponent {
  constructor(private route: ActivatedRoute) {}
  public error: string;
  public firstName: string;
  private destroy$ = new Subject();

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.firstName = params?.firstName;
        this.error = params?.error;
      });
  }
}
