import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService} from './auth.service';
import {AppComponent} from './app.component';
import {BruteForceInterceptor} from './http-interceptors/brute-force.interceptor';

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
      useClass: BruteForceInterceptor,
      multi: true,
    },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
