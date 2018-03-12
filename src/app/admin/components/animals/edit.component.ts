import { Component, OnInit } from '@angular/core';

@Component(
	{
		selector: 'admin-edit',
		templateUrl: '../../views/animals/edit.html'
	})

export class EditComponent implements OnInit
{
	public title: string;

	constructor()
	{
		this.title = 'Edit';
	}

	ngOnInit()
	{}
}
