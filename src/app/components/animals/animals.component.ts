import { Component, OnInit } from '@angular/core';

import { fade_fx } from '../animation.component';

@Component(
	{
		selector: 'animals',
		templateUrl: '../../views/animals/animals.html',
		animations: [fade_fx]
	})

export class AnimalsComponent implements OnInit
{
	public title: string;

	constructor()
	{
		this.title = 'Animals';
	}

	ngOnInit()
	{
		console.log(localStorage.getItem('email'));
	}
}
