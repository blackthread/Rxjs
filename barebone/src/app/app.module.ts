import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { ErrorInterceptor} from './helpers/error.interceptor';
import { AuthService} from './auth.service';
import { RetryWhenInterceptor} from './http-interceptors/retry-when.interceptor';


import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryWhenInterceptor,
      multi: true,
    },
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },*/
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
