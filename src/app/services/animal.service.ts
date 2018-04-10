import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GLOBAL } from '../globals';

@Injectable()
export class AnimalService
{
	public url: string;

	private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

	constructor
	(
		private http: HttpClient
	){
		this.url = GLOBAL.app_url;
	}

	createAnimal(token, animal)
	{
		const data = JSON.stringify(animal);

		return this.http.post(this.url + '/animal/create', data, this.headers);
	}

	viewAnimal()
	{}

	updateAnimal()
	{}

	deleteAnimal()
	{}
}
