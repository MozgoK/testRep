import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MainService } from '../service/main.service';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  viewLoader = false;
  visibleAvatar = false;

  constructor(private router: Router, private auth: AuthService, private service: MainService) { }

  ngOnInit(): void {
    this.service.firstPageIsAuth = true;
  }

  logIn(): void {
    this.service.viewLoader = true;
    this.router.navigate(['/desk']);

    setTimeout(()=>{
      this.visibleAvatar = true;
      this.service.answerMsg(6, null, 5000, ['почти приветствие','ну и пока)']);
    }, 400);
  }

  enter(e): void {
    if (e.code.toLowerCase() === 'enter'){
      this.logIn();
    }
  }

}
