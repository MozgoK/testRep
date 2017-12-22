import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
	constructor(private service: MainService, private auth: AuthService, private router: Router){}

	exit(): void{
		this.service.url = '';
		this.service.viewMenu = false;
		this.auth.logOut(); 
		this.router.navigate(['/']);
	}
}
