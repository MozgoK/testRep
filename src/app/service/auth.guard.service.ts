import { CanActivate,
		ActivatedRouteSnapshot,
		RouterStateSnapshot,
		Router
		 } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { MainService } from './main.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate {

	constructor(private auth: AuthService, private service: MainService, private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
				: Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.isAuth().then((isLoggedIn: boolean)=>{
			if (isLoggedIn) {
				this.service.viewMenu = true;
			} else {
				console.log('Unauthorized');
				this.router.navigate(['/']);
			}
			return isLoggedIn;
		});
	}
}