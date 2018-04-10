import { Injectable } from '@angular/core';

import { UserService } from './user.service';

import { GLOBAL } from '../globals';

@Injectable()
export class UploadService
{
	public url: string;
	public identity: any;
	public token: any;

	constructor
	(
		private _userService: UserService,
	){
		this.url = GLOBAL.app_url;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	makeFileRequest(files: Array<File>, category, name)
	{
		this.url = this.url + '/' + category + '/' + this.identity._id + '/upload';

		return new Promise((resolve, reject) =>
		{
			const formData: any = new FormData();
			const xhr = new XMLHttpRequest();

			for (let i = 0; i < files.length; i++)
			{
				formData.append(name, files[i], files[i].name);
			}

			xhr.onreadystatechange = () =>
			{
				if (xhr.readyState === 4)
				{
					if (xhr.status === 200)
					{
						resolve(JSON.parse(xhr.response));
					} else {

						reject(xhr.response);
					}
				}
			};

			xhr.open('POST', this.url, true);
			xhr.setRequestHeader('Authorization', this.token);
			xhr.send(formData);
		});
	}
}
