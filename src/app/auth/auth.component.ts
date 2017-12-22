import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MainService } from '../service/main.service';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  viewLoader = false;

  constructor(private router: Router, private auth: AuthService, private service: MainService) { }

  ngOnInit(): void {
    this.service.url = this.router.url;
  }

  logIn(): void {
    this.service.viewLoader = true;
    this.router.navigate(['/desk']);
  }

  enter(e): void {
    if (e.code.toLowerCase() === 'enter'){
      this.logIn();
    }
  }

}
