import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GLOBAL } from '../../../globals';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';

import { fade_fx } from '../../animation.component';

@Component(
	{
		selector: 'admin-create',
		templateUrl: '../../views/animals/create.html',
		animations: [fade_fx],
		providers: [AnimalService, UserService, UploadService]
	})

export class CreateComponent implements OnInit
{
	public title: string;
	public animal: Animal;
	public identity;
	public token;
	public url: string;
	public status: string;

	public filesToUpload: any;

	constructor
	(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _animalService: AnimalService,
		private _uploadService: UploadService
	){
		this.title = 'Add new animal';
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
		this._animalService.createAnimal(this.token, this.animal)
			.subscribe(
				(response: any) =>
				{
					if (!response.animal)
					{
						this.status = 'error';
					}

					this.status = 'success';
					this.animal = response.animal;

					if (this.filesToUpload)
					{
						this.uploadFiles(this.animal._id);
					} else {

						this._router.navigate(['/admin/list']);
					}
				},
				(error: any) =>
				{
					const errorMessage = error;

					this.status = (errorMessage != null ? 'error' : null);
				}
			);
	}

	updateFiles(fileInput: any)
	{
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	uploadFiles(id)
	{
		this._uploadService.makeFileRequest(this.filesToUpload, 'animal', 'image', id)
			.then((response: any) =>
			{
				this.animal.image = response.image;

				this.status = 'success';
				console.log('image: ' + this.animal.image);

				this._router.navigate(['/admin/list']);
			});
	}
}
