import { Component } from '@angular/core';

@Component(
{
	selector: 'error-404',
	templateUrl: '../../views/error/404.html'
})

export class FourOhFourComponent
{
	public error: string;

	constructor()
	{
		this.error = 'Error 404: Page not found!';
	}
}
