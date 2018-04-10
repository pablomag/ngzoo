import { Component, OnInit } from '@angular/core';

import { fade_fx } from './animation.component';

import { User } from '../models/user';

import { UserService } from '../services/user.service';

@Component(
{
	selector: 'register',
	templateUrl: '../views/register.html',
	animations: [fade_fx],
	providers: [UserService]
})

export class RegisterComponent implements OnInit
{
	public title: string;
	public status: string;
	public message: string;

	public user: User;

	public data;

	constructor
	(
		private _userService: UserService
	){
		this.title = 'Register to our site';
		this.user = new User(null, '', '', '', '', 'ROLE_USER', '');
		this.status = 'loading';
	}

	ngOnInit()
	{}

	onSubmit(registerForm)
	{
		this._userService.register(this.user).subscribe
		(
			data =>
			{
				this.data = data;
				this.message = 'User ' + this.data.user.name + ' successfully registered';
				this.status = 'success';

				registerForm.reset();
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
