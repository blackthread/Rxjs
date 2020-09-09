import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService} from './auth.service';


import { RetryWhenInterceptor} from './http-interceptors/retry-when.interceptor';


import {AppComponent} from './app.component';
import {BruteForceInterceptor} from "./http-interceptors/brute-force.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
   // {
   //   provide: HTTP_INTERCEPTORS,
   //   useClass: RetryWhenInterceptor,
   //   multi: true,
   // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BruteForceInterceptor,
      multi: true,
    },
    AuthService
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    ,*/
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
