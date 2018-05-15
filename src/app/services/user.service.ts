import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { GLOBAL } from '../globals';

@Injectable()
export class UserService
{
	public url: string;
	public identity: any;
	public token: any;

	private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

	constructor
	(
		private _http: HttpClient,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.url = GLOBAL.app_url;
	}

	logout()
	{
		localStorage.clear();

		this.identity = null;
		this.token = null;

		this._router.navigate(['/']);
	}

	login(user, gettoken = null)
	{
		user.gettoken = (gettoken !== null ? gettoken : null);

		const data = JSON.stringify(user);

		return this._http.post(this.url + '/user/login', data, this.headers);
	}

	register(user)
	{
		const data = JSON.stringify(user);

		return this._http.post(this.url + '/user/register', data, this.headers);
	}

	update(user)
	{
		this.token = this.getToken();
		this.headers = { headers: new HttpHeaders().set('Authorization', this.token).set('Content-Type', 'application/json') };

		const data = JSON.stringify(user);

		return this._http.put(this.url + '/user/' + user._id, data, this.headers);
	}

	showKeepers()
	{
		this.headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

		return this._http.get(this.url + '/keepers', this.headers);
	}

	getIdentity()
	{
		const identity = JSON.parse(localStorage.getItem('identity'));

		this.identity = (identity !== 'undefined' ? identity : null);

		return this.identity;
	}

	getToken()
	{
		const token = localStorage.getItem('token');

		this.token = (token !== 'undefined' ? token : null);

		return this.token;
	}
}
