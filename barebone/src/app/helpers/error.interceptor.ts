import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {SecurityService} from '../services/security.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  body = {
    username: 'erwin',
    smctenantid: 'cbc7c2e5-afb6-471b-8574-f65edb7edf25',
    organizationname: 'SSOUniverse1',
    userrights: ['OFR.C', 'OFR.R', 'OFR.T', 'OFR.U', 'OFR.D'],
    allowedorganizations: ['SSOUniverse1']
  };

  constructor(private securityService: SecurityService, private http: HttpClient) {
  }

  $token(): Observable<any> {
    return this.http.post<any>('http://localhost:2637/api/authentication', this.body);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.securityService.RemoveToken();
          //retrieve the token
          this.$token()
            .pipe(map(data => {
                console.log(data);
                localStorage.setItem('token', data);
              })

            )
            .subscribe();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
