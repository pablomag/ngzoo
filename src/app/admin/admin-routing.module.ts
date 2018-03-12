import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/animals/list.component';
import { CreateComponent } from './components/animals/create.component';
import { EditComponent } from './components/animals/edit.component';

const adminRoutes: Routes =
[
	{
		path: 'admin',
		component: MainComponent,
		children:
		[
			{ path: 'list', component: ListComponent },
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{ path: 'create', component: CreateComponent },
			{ path: 'edit', component: EditComponent }
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
