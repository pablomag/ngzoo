import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing.module';

import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/animals/list.component';
import { CreateComponent } from './components/animals/create.component';
import { EditComponent } from './components/animals/edit.component';

import { GuardService } from '../services/guard.service';
import { UserService } from '../services/user.service';

@NgModule(
{
	declarations:
	[
		MainComponent,
		ListComponent,
		CreateComponent,
		EditComponent
	],
	imports:
	[
		CommonModule,
		FormsModule,
		HttpModule,
		AdminRoutingModule
	],
	exports:
	[
		MainComponent
	],
	providers:
	[
		GuardService,
		UserService
	]
})

export class AdminModule {}
