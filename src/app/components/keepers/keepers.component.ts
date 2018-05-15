import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

import { GLOBAL } from '../../globals';

import { fade_fx } from '../animation.component';

@Component(
{
	selector: 'animals',
	templateUrl: '../../views/keepers/keepers.html',
	animations: [fade_fx],
	providers: [UserService]
})

export class KeepersComponent implements OnInit
{
	public title: string;
	public keepers: User[];

	public url: string;

	constructor
	(
		private _userService: UserService
	){
		this.url = GLOBAL.app_url;
		this.title = 'Keepers';
	}

	ngOnInit()
	{
		this.showKeepers();
	}

	showKeepers()
	{
		this._userService.showKeepers().subscribe
		(
			(response: any) =>
			{
				if (response.keepers)
				{
					this.keepers = response.keepers;
					console.log(this.keepers);
				}
			},
			(error: any) =>
			{
				console.log(error);
			}
		);
	}
}
