import { Component, TestabilityRegistry } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherForecast} from './weatherforecast';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [KeyValuePipe]
})
export class AppComponent {
  title = 'barebone';
  test = '';


 // $weather(): Observable<any> {
 //   return this.http.get<any>('https://localhost:44325/weatherforecast');
 // }

 //$values(): Observable<any> {
 //  return this.http.get<any>('https://enigma-siteapi.emsecure.local/api/values');
// }

//{
//  headers: {
//    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjIiLCJ1bml2ZXJzZUlkIjoiMTAiLCJ1c2VySWQiOiI3IiwibmJmIjoxNTk5MjE5NjU5LCJleHAiOjE1OTkyMTk5NTksImlhdCI6MTU5OTIxOTY1OX0.3uzlj2yn1S_vANLJypwFQxjIEtjTw4_oJeY-er08B5A'
//  },
//}

//,
   //{
  //headers: {
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjIiLCJ1bml2ZXJzZUlkIjoiMTAiLCJ1c2VySWQiOiI3IiwibmJmIjoxNTk5MjIyMjQwLCJleHAiOjE1OTkyMjI1NDAsImlhdCI6MTU5OTIyMjI0MH0.6v-RAYmUJo32CUCgkKsCwH1lhXZ1OqKV5xu8DfRUWvU'
  //},
//}

 $tenant(): Observable<any> {
   return this.http.get<any>('https://enigma-siteapi.emsecure.local/api/Tenant'
   ,
   {
  headers: {
       Authorization: 'Bearer '
  },
}
);
 }

  constructor(private http: HttpClient, private keyValue: KeyValuePipe) {

  }

  handleClick(event: Event) {
    console.log('Click!', event);
   // this.http.get<string>('https://enigma-siteapi.emsecure.local/api/Tenant')
   //   .pipe(map(data => { })).subscribe(result => {
   //     console.log(result);
   //   });

   /*
    this.http.get('https://localhost:44325/weatherforecast').pipe(map(data => { })).subscribe(result => {
        console.log(result);
     });

    this.$weather()
      .pipe(map(data => {
        const weather = this.keyValue.transform(data);
        console.log(weather);
      }))
      .subscribe();



        this.$values()
      .pipe(map(data => {
        const values = this.keyValue.transform(data);
        console.log(values);
      }))
      .subscribe();
      */


    this.$tenant()
      .pipe(map(data => {
        const values = this.keyValue.transform(data);
        console.log(values);
      })

      )
      .subscribe();







}
}


