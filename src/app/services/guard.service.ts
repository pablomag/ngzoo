import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class GuardService implements CanActivate
{
	public identity: any;

	constructor
	(
		private _userService: UserService,
		private _router: Router
	){
		this.identity = this._userService.getIdentity();
	}

	canActivate()
	{
		this.identity = this._userService.getIdentity()

		if	(this.identity && this.identity.role === 'ROLE_ADMIN')
		{
			return true;
		} else {

			this._router.navigate(['/']);
			return false;
		}
	}
}
