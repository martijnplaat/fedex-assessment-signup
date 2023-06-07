import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  User,
  UserResponse,
} from '../components/signup-form/signup-form.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class SignupApiService {
  constructor(private http: HttpClient) {}
  signUpUsersUrl = 'https://demo-api.now.sh/users';

  public addUser(user: User): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.signUpUsersUrl, user, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<UserResponse> => {
          return throwError(() => new Error(error.message));
        })
      );
  }
}
