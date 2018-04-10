import { Component } from '@angular/core';

import { fade_fx } from './animation.component';

import { User } from '../models/user';

import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';

import { GLOBAL } from '../globals';

@Component(
{
	selector: 'profile',
	templateUrl: '../views/profile.html',
	animations: [fade_fx],
	providers: [UserService, UploadService]
})

export class ProfileComponent
{
	public title: string;
	public message: string;
	public status: string;
	public url: string;

	public user: User;

	public data: any;
	public identity: any;
	public token: any;

	public filesToUpload: any;

	constructor
	(
		private _userService: UserService,
		private _uploadService: UploadService
	){
		this.status = 'loading';

		this.url = GLOBAL.app_url;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.user = this.identity;

		this.title = this.identity.name + ' ' + this.identity.surname + ' profile';
	}

	onSubmit()
	{
		this._userService.update(this.user).subscribe
		(
			data =>
			{
				this.data = data;
				this.user = this.data.user;

				if (this.filesToUpload)
				{
					this.uploadFiles();
				} else {

					this.message = 'User ' + this.data.user.name + ' updated';
					this.status = 'success';
				}
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

	updateFiles(fileInput: any)
	{
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	uploadFiles()
	{
		this._uploadService.makeFileRequest(this.filesToUpload, 'user', 'image')
						.then((result: any) =>
						{
							this.user.image = result.image;

							localStorage.setItem('identity', JSON.stringify(this.user));

							this.title = this.identity.name + ' ' + this.identity.surname + ' profile';

							this.message = 'User ' + this.data.user.name + ' updated';
							this.status = 'success';
							console.log('image: ' + this.user.image);
						});
	}
}
