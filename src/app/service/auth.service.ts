import { Injectable } from '@angular/core';
import { MainService } from './main.service';

@Injectable()
export class AuthService {

	constructor(private service: MainService){}
	public isLoggedIn = false;

	isAuth(){
		return new Promise((resolve,reject)=>{
			if (this.isLoggedIn) {
				resolve(this.isLoggedIn);
			} else {
				if (this.service.url === '/' && this.logIn()) {
					setTimeout(()=>{
						resolve(this.isLoggedIn);
					}, 1000);
				} else {
					resolve(false);
				}
			}
		});
	}

	logIn(){
		this.isLoggedIn = true;
		return true;
	}

	logOut(){
		this.isLoggedIn = false;
	}
}