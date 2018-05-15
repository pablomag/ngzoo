import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';

import { fade_fx } from '../../animation.component';

@Component(
{
	selector: 'admin-list',
	templateUrl: '../../views/animals/list.html',
	animations: [fade_fx],
	providers: [ AnimalService ]
})

export class ListComponent implements OnInit
{
	public title: string;
	public animals: Animal[];
	public animal: Animal;

	public token;
	public search: string;

	constructor
	(
		private _animalService: AnimalService,
		private _userService: UserService
	){
		this.title = 'List of animals';
		this.token = this._userService.getToken();
	}

	ngOnInit()
	{
		this.showAnimals();
	}

	showAnimals()
	{
		this._animalService.showAnimals().subscribe
		(
			(response: any) =>
			{
				if (response.animals)
				{
					this.animals = response.animals;
				}
			},
			(error: any) =>
			{
				console.log(error);
			}
		);
	}

	deleteAnimal(id)
	{
		$('#confirm-' + id).modal('hide');

		this._animalService.deleteAnimal(this.token, id).subscribe
		(
			(response: any) =>
			{
				if (response.animal)
				{
					this.animal = response.animal;
				}

				this.showAnimals();
			},
			(error: any) =>
			{
				console.log(error);
			}
		);
	}
}
