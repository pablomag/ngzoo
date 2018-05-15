import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

import { ListComponent } from './components/animals/list.component';
import { DetailsComponent } from './components/animals/details.component';
import { CreateComponent } from './components/animals/create.component';
import { EditComponent } from './components/animals/edit.component';

import { GuardService } from '../services/guard.service';

const adminRoutes: Routes =
[
	{
		path: 'admin',
		component: MainComponent,
		canActivate: [GuardService],
		children:
		[
			{ path: 'list', component: ListComponent },
			{ path: 'animal/:id', component: DetailsComponent },
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{ path: 'create', component: CreateComponent },
			{ path: 'edit/:id', component: EditComponent }
		]
	}
];

@NgModule(
{
	imports:
	[
		RouterModule.forChild(adminRoutes)
	],
	exports:
	[
		RouterModule
	]
})

export class AdminRoutingModule {}
