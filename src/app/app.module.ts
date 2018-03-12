import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';

import { FourOhFourComponent } from './components/errors/four-oh-four.component';

import { HomeComponent } from './components/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { StoreComponent } from './components/store/store.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule(
{
	declarations:
	[
		AppComponent,
		FourOhFourComponent,
		HomeComponent,
		AnimalsComponent,
		KeepersComponent,
		ContactComponent,
		StoreComponent
	],
	imports:
	[
		BrowserModule,
		FormsModule,
		routing,
		AdminModule,
		BrowserAnimationsModule
	],
	providers: [appRoutingProviders],
	bootstrap: [AppComponent]
})

export class AppModule {}
