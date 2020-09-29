import { HttpClient } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import {AuthService} from './auth.service';
import { LogService } from '../../util/log.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [KeyValuePipe]
})
export class AppComponent {
  title = 'barebone';

  constructor(private http: HttpClient,
              private keyValue: KeyValuePipe,
              private authService: AuthService,
              private logger: LogService

) {  }

  clearToken(){
    localStorage.clear();
  }

  handleClick() {
    this.logger.log('Test the log() method');
}
}


