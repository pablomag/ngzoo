import { Component, OnInit } from '@angular/core';

import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';

import { GLOBAL } from '../../globals';

import { fade_fx } from '../animation.component';

@Component(
	{
		selector: 'animals',
		templateUrl: '../../views/animals/animals.html',
		animations: [fade_fx],
		providers: [AnimalService]
	})

export class AnimalsComponent implements OnInit
{
	public title: string;
	public animals: Animal[];

	public url: string;

	constructor
	(
		private _animalService: AnimalService
	){
		this.url = GLOBAL.app_url;
		this.title = 'Animals';
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
}
