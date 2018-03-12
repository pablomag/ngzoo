import { Component, OnInit } from '@angular/core';

@Component(
	{
		selector: 'admin-create',
		templateUrl: '../../views/animals/create.html'
	})

export class CreateComponent implements OnInit
{
	public title: string;

	constructor()
	{
		this.title = 'Create';
	}

	ngOnInit()
	{}
}
