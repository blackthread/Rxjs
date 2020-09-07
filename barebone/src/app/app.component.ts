import { Component, TestabilityRegistry } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherForecast} from './weatherforecast';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [KeyValuePipe]
})
export class AppComponent {
  title = 'barebone';
  test = '';


  $tenant(): Observable<any> {
    return this.http.get<any>('http://localhost:2637/api/Tenant');
  }




  constructor(private http: HttpClient, private keyValue: KeyValuePipe) {

  }

  clearToken(){
    localStorage.clear();
  }

  handleClick(event: Event) {
    console.log('Click!', event);
    this.$tenant()
      .pipe(map(data => {
        console.log(data);
      })

      )
      .subscribe();







}
}


