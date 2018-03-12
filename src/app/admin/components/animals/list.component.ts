import { Component, OnInit } from '@angular/core';

@Component(
	{
		selector: 'admin-list',
		templateUrl: '../../views/animals/list.html'
	})

export class ListComponent implements OnInit
{
	public title: string;

	constructor()
	{
		this.title = 'List';
	}

	ngOnInit()
	{}
}
