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

  pass: string = '';
  name: string = '';
  alert: boolean = false;
  alertPass: boolean = false;
  alertName: boolean = false;
  alertBr: boolean = false;

  constructor(private router: Router, private auth: AuthService, private service: MainService) { }

  ngOnInit(): void {
    this.service.firstPageIsAuth = true;
  }

  logIn(): void {
    if (this.name === '' || this.pass === '') {
      this.check();
    } else {
      this.alert = false;

      this.service.viewLoader = true;
      this.service.myName = this.name;
      this.router.navigate(['/desk']);

      setTimeout(()=>{
        this.visibleAvatar = true;
        this.service.answerMsg(6, null, 5000, ['Эй, друг','куда пропал?)']);
        this.service.answerMsg(5, null, 7300, ['Привет!','У меня тут кошка рожает','Нужна срочно твоя помощь!']);
      }, 400);
    }
  }

  enter(e): void {
    this.alert = false;

    if (e.code.toLowerCase() === 'enter'){
      this.logIn();
    }
  }


  check(): void {
    this.alert = true;

    this.alertName = 
      this.name === ''
        ? true
        : false;

    this.alertPass = 
      this.pass === ''
      ? true
      : false;

    this.alertBr = this.alertName && this.alertPass;
  }

}
