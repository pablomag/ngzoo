import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GLOBAL } from '../globals';

@Injectable()
export class AnimalService
{
	public url: string;

	private headers = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

	constructor
	(
		private _http: HttpClient
	){
		this.url = GLOBAL.app_url;
	}

	showAnimals()
	{
		this.headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

		return this._http.get(this.url + '/animals', this.headers);
	}

	createAnimal(token, animal)
	{
		const json = JSON.stringify(animal);

		const params = new HttpParams({ fromObject: { 'json': json } });

		this.headers = { headers: new HttpHeaders({'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded'}) };

		return this._http.post(this.url + '/animal/create', params, this.headers);
	}

	viewAnimal(id)
	{
		this.headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

		return this._http.get(this.url + '/animal/' + id, this.headers);
	}

	updateAnimal(token, animal)
	{
		const json = JSON.stringify(animal);

		const params = new HttpParams({ fromObject: { 'json': json } });

		this.headers = { headers: new HttpHeaders({'Authorization': token, 'Content-Type': 'application/x-www-form-urlencoded'}) };

		return this._http.put(this.url + '/animal/' + animal._id, params, this.headers);
	}

	deleteAnimal(token, id)
	{
		this.headers = { headers: new HttpHeaders({'Authorization': token, 'Content-Type': 'application/json'}) };

		return this._http.delete(this.url + '/animal/' + id, this.headers);
	}
}
