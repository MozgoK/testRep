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

  constructor(private router: Router, private auth: AuthService, private mainService: MainService) { }

  ngOnInit() {
  }

  logIn() {
    this.viewLoader = true;
    this.auth.logIn();
    this.router.navigate(['/desk']);
  }

}
