import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './service/main.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./main.style.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private service: MainService, private auth: AuthService, private router: Router){}

  exit(): void{
    this.service.firstPageIsAuth = false;
    this.service.viewMenu = false;
    this.auth.logOut(); 
    this.router.navigate(['/']);
  }
}
