import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GLOBAL } from '../../../globals';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';

@Component(
	{
		selector: 'admin-create',
		templateUrl: '../../views/animals/create.html',
		providers: [AnimalService, UserService, UploadService]
	})

export class CreateComponent implements OnInit
{
	public title: string;
	public animal: Animal;
	public identity;
	public token;
	public url: string;

	constructor
	(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _animalService: AnimalService,
		private _uploadService: UploadService
	){
		this.title = 'Create';
		this.animal = new Animal('', '', '', '', null, '', '');
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.app_url;
	}

	ngOnInit()
	{
		console.log('Animal create loaded');
	}

	onSubmit()
	{
		console.log(this.animal);
	}
}
