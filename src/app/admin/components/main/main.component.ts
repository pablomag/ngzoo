import { Component, OnInit } from '@angular/core';

@Component(
{
	selector: 'admin-main',
	templateUrl: '../../views/main/main.html'
})

export class MainComponent implements OnInit
{
	public title: string;

	constructor()
	{
		this.title = 'Admin Main';
	}

	ngOnInit()
	{}
}
