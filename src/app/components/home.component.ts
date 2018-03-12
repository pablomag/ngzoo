import { Component } from '@angular/core';

import { fade_fx } from './animation.component';

@Component(
	{
		selector: 'home',
		templateUrl: '../views/home.html',
		animations: [fade_fx]
	})

export class HomeComponent
{
	public title: string;
	public slogan: string;
	public know_our_animals: string;
	public meet_our_keepers: string;
	public contact_us: string;

	constructor()
	{
		this.title = 'Welcome to ngZoo!';
		this.slogan = 'Don\'t mmiss out the unique opportunity to enjoy all the magic of our park and our animals';
		this.know_our_animals = 'Exotic animals like you have never seen!';
		this.meet_our_keepers = 'Our caretakers give their best for our animals!';
		this.contact_us = 'Contact us and let us know your experience!';
	}
}
