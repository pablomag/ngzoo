import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminRoutingModule } from './admin-routing.module';

import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/animals/list.component';
import { DetailsComponent } from './components/animals/details.component';
import { CreateComponent } from './components/animals/create.component';
import { EditComponent } from './components/animals/edit.component';

import { GuardService } from '../services/guard.service';
import { UserService } from '../services/user.service';

import { SearchPipe } from '../pipes/search.pipe';

@NgModule(
{
	declarations:
	[
		MainComponent,
		ListComponent,
		DetailsComponent,
		CreateComponent,
		EditComponent,
		SearchPipe
	],
	imports:
	[
		CommonModule,
		FormsModule,
		AdminRoutingModule,
		BrowserAnimationsModule
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
