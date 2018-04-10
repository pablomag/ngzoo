import { trigger, style, transition, animate } from '@angular/animations';

export const fade_fx = trigger('fade_fx',
[
	transition(':enter',
	[
		style(
		{
			transform: 'translateX(-65%)',
			opacity: 0
		}),
		animate('.5s ease-out',
		style(
		{
			transform: 'translateX(0)',
			opacity: 1
		}))
	])
]);
