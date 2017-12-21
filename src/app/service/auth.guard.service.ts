import { CanActivate,
		ActivatedRouteSnapshot,
		RouterStateSnapshot
		 } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { MainService } from './main.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate {

	constructor(private auth: AuthService, private mainService: MainService){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
				: Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.isAuth().then((isLoggedIn: boolean)=>{
			if (isLoggedIn) {this.mainService.viewMenu = true;}
			return isLoggedIn;
		});
	}
}