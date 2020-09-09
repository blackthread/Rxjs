import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, of } from 'rxjs';
import {catchError, delay, filter, pluck, take, tap, map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

export interface RefreshTokenResult {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  private tokenSubject$ = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject$.pipe(
    filter((token) => token !== null),
    take(1)
  );

  refreshToken$: Observable<any> = defer(() => {
    if (this.tokenSubject$.value === null) {
      return this.token$;
    }
    // Defer allows us to easily execute some action when the Observable
    // is subscribed. Here, we set the current token to `null` until the
    // refresh operation is complete. This ensures no requests will be
    // sent with a known bad token.
    this.tokenSubject$.next(null);

    return this.refreshToken().pipe(
      tap((res) => {
        this.tokenSubject$.next(res.accessToken);
      }),
      catchError((err) => {
        this.logout();
        throw err;
      })
    );
  });

  get token(): string | null {
    return this.tokenSubject$.value;
  }

  authenticate(): void {
    this.tokenSubject$.next('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjIiLCJ1bml2ZXJzZUlkIjoiMTAiLCJ1c2VySWQiOiI3IiwibmJmIjoxNTk5NjU0Nzg4LCJleHAiOjE1OTk2NTUwODgsImlhdCI6MTU5OTY1NDc4OH0.9Tn4gAMxUXV_kwe9syLOzoXzvpfBIJQ4Z8RYlCYzd-w');
  }

  refreshToken(): Observable<RefreshTokenResult> {
    const auth$ = this.http.post<any>('http://localhost:2637/api/authentication', this.body).pipe(
      map(res => res));
    auth$.subscribe(data => this.tokenSubject$.next(data), () => {});
    return auth$;
  }

  body = {
    username: 'erwin',
    smctenantid: 'cbc7c2e5-afb6-471b-8574-f65edb7edf25',
    organizationname: 'SSOUniverse1',
    userrights: ['OFR.C', 'OFR.R', 'OFR.T', 'OFR.U', 'OFR.D'],
    allowedorganizations: ['SSOUniverse1']
  };

  logout(): void {}
}
