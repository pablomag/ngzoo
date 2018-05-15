import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../globals';

import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';

import { fade_fx } from '../../animation.component';

@Component(
{
	selector: 'admin-edit',
	templateUrl: '../../views/animals/create.html',
	animations: [fade_fx],
	providers: [AnimalService, UserService, UploadService]
})

export class EditComponent implements OnInit
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
		this.title = 'Edit';
		this.animal = new Animal('', '', '', '', null, '', '');
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.app_url;
	}

	ngOnInit()
	{
		this._route.params.forEach((params: Params) =>
		{
			const id = params['id'];

			this._animalService.viewAnimal(id).subscribe
			(
				(response: any) => {
					if (response.animal)
					{
						this.animal = response.animal;
					} else {

						this._router.navigate(['/admin/list']);
					}
				},
				(error: any) =>
				{
					console.log(error);

					this._router.navigate(['/admin/list']);
				}
			);
		});
	}

	onSubmit()
	{
		this._animalService.updateAnimal(this.token, this.animal)
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

						this._router.navigate(['/admin/animal', this.animal._id]);
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

			this._router.navigate(['/admin/animal', this.animal._id]);
		});
	}
}
