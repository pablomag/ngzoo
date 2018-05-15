import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';

import { GLOBAL } from '../../../globals';

import { fade_fx } from '../../animation.component';

@Component(
{
	selector: 'animal-details',
	templateUrl: '../../views/animals/details.html',
	animations: [fade_fx],
	providers: [AnimalService]
})

export class DetailsComponent implements OnInit
{
	public title: string;
	public animal: Animal;

	public url: string;

	constructor
	(
		private _animalService: AnimalService,
		private _router: Router,
		private _route: ActivatedRoute
	){
		this.url = GLOBAL.app_url;

		this.title = 'Details';
	}

	ngOnInit()
	{
		this._route.params.forEach((params: Params) =>
		{
			const id = params['id'];

			this._animalService.viewAnimal(id).subscribe
			(
				(response: any) => {
					if (response.animal)
					{
						this.animal = response.animal;
					} else {

						this._router.navigate(['/admin/list']);
					}
				},
				(error: any) =>
				{
					console.log(error);

					this._router.navigate(['/admin/list']);
				}
			);
		});
	}
}
