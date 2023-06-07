import { Routes } from '@angular/router';
import { SignupCompleteComponent } from './components/signup-complete';
import { SignupFormComponent } from './components/signup-form';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: SignupFormComponent,
  },
  {
    path: 'signup-complete',
    component: SignupCompleteComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
