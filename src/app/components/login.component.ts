import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { fade_fx } from './animation.component';

import { User } from '../models/user';

import { UserService } from '../services/user.service';

@Component(
{
	selector: 'login',
	templateUrl: '../views/login.html',
	animations: [fade_fx],
	providers: [UserService]
})

export class LoginComponent
{
	public title: string;
	public message: string;
	public status: string;

	public user: User;

	public data;
	public identity;
	public token;

	constructor
	(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'Login into our site';
		this.user = new User(null, '', '', '', '', '', '');
		this.status = 'loading';
	}

	onSubmit(loginForm)
	{
		this._userService.login(this.user).subscribe
		(
			data =>
			{
				this.getToken();

				this.data = data;
				this.identity = this.data.user;
				this.identity.password = null;

				localStorage.setItem('identity', JSON.stringify(this.identity));

				this.message = 'Welcome ' + this.data.user.name;
				this.status = 'success';

				loginForm.reset();
			},
			err =>
			{
				this.data = err;

				this.message = this.data.error.message;
				this.status = 'error';

				console.error(err);
			},
			() => console.log('done')
		);
	}

	getToken()
	{
		this._userService.login(this.user, 'true').subscribe
		(
			data =>
			{
				this.data = data;
				this.token = this.data.token;

				localStorage.setItem('token', this.token);

				this._router.navigate(['/']);
			},
			err =>
			{
				this.data = err;

				this.message = this.data.error.message;
				this.status = 'error';

				console.error(err);
			},
			() => console.log('done')
		);
	}
}
