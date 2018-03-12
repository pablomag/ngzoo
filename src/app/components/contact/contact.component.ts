import { Component } from '@angular/core';

@Component(
{
	selector: 'contact',
	templateUrl: '../../views/contact/contact.html'
})

export class ContactComponent
{
	public title: string;
	public email: string;

	constructor()
	{
		this.title = 'Contact';
		this.email = '';
	}

	save()
	{
		localStorage.setItem('email', this.email);
		console.log(localStorage.getItem('email'));
	}
}
