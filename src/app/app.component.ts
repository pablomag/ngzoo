import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component(
{
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent
{
	public title: string;

	constructor
	(
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'ngZoo';
	}
}
