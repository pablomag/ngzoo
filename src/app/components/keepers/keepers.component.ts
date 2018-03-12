import { Component } from '@angular/core';

@Component(
	{
		selector: 'keepers',
		templateUrl: '../../views/keepers/keepers.html'
	})

export class KeepersComponent
{
	public title: string;

	constructor()
	{
		this.title = 'Keepers';
	}
}
