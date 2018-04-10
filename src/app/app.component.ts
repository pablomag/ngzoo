import { Component, OnInit, DoCheck } from '@angular/core';

import { UserService } from './services/user.service';

import { GLOBAL } from './globals';

@Component(
{
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck
{
	public title: string;
	public copyright: string;
	public url: string;

	public identity;

	constructor
	(
		private _userService: UserService
	){
		this.title = GLOBAL.app_name;
		this.copyright = GLOBAL.app_copyright;
		this.url = GLOBAL.app_url;
	}

	ngOnInit()
	{
		this.identity = this._userService.getIdentity();
	}

	ngDoCheck()
	{
		this.identity = this._userService.getIdentity();
	}

	logout()
	{
		this._userService.logout();
	}
}
