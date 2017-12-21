import { Component, ViewEncapsulation } from '@angular/core';
import { MainService } from './service/main.service';
import { AuthService } from './service/auth.service';

// const STYLES  = require('./style.less');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style.less'],
  encapsulation: ViewEncapsulation.None
  // style: [STYLES]
})
export class AppComponent {
	constructor(private mainService: MainService, private auth: AuthService){}
  title = 'app';
}
