import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component(
{
	selector: 'store',
	templateUrl: '../../views/store/index.html',
	animations:
	[
		trigger('animate',
		[
			state('inactive', style(
			{
				border: '1px solid black',
				backgroundColor: 'black'
			})),
			state('active', style(
			{
				border: '2px solid red',
				backgroundColor: 'red'
			})),
			transition
			(
				'inactive => active',
				animate('3s linear')
			),
			transition(
				'active => inactive',
				animate('3s linear')
			)
		])
	]
})

export class StoreComponent
{
	public title: string;
	public parkName: string;
	public state: string;

	constructor()
	{
		this.title = 'Store front';
		this.parkName = '';
		this.state = 'inactive';
	}

	show()
	{
		console.log(this.parkName);
	}

	receive(data)
	{
		this.title = data.name;
		console.log(data.name);
	}

	toggle(state)
	{
		console.log(state);
		this.state = (state === 'inactive' ? 'active' : 'inactive');
	}
}
