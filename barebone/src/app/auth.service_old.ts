import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, of } from 'rxjs';
import { catchError, delay, filter, take, tap } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

export interface RefreshTokenResult {
  accessToken: string;
}

@Injectable()
export class AuthService_old {

  constructor(private http: HttpClient) {
  }

  private tokenSubject$ = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject$.pipe(
    take(1)
  );

  refreshToken$: Observable<any> = defer(() => {
    this.tokenSubject$.next(null);

    return this.refresh().pipe(
      tap((res) => {
        this.tokenSubject$.next(res);
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

  refresh(): Observable<any> {
    return this.http.post<any>('http://localhost:2637/api/authentication', this.body);
  }

  logout(): void {}


  body = {
    username: 'erwin',
    smctenantid: 'cbc7c2e5-afb6-471b-8574-f65edb7edf25',
    organizationname: 'SSOUniverse1',
    userrights: ['OFR.C', 'OFR.R', 'OFR.T', 'OFR.U', 'OFR.D'],
    allowedorganizations: ['SSOUniverse1']
  };


}
