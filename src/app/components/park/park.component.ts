import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component(
{
	selector: 'park',
	templateUrl: '../../views/park/index.html'
})

export class ParkComponent implements OnChanges, OnDestroy
{
	@Input() name: string;
	@Output() data = new EventEmitter();
	public location: string;
	public area: number;
	public open: boolean;

	constructor()
	{
		this.name = 'Parque Nacional Los Alerces';
		this.location = 'Neuquen Argentina';
		this.area = 300000;
		this.open = true;
	}

	ngOnChanges(changes: SimpleChanges)
	{
		console.log('on changes!');
		console.log(changes);
	}

	ngOnDestroy()
	{
		console.log('destroyed!');
	}

	send()
	{
		this.data.emit
		(
			{
				'name': this.name,
				'location': this.location,
				'area': this.area,
				'open': this.open
			}
		);
	}
}
