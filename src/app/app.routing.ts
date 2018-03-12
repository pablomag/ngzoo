import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourOhFourComponent } from './components/errors/four-oh-four.component';
import { HomeComponent } from './components/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { StoreComponent } from './components/store/store.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes: Routes =
[
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'animals', component: AnimalsComponent },
	{ path: 'keepers', component: KeepersComponent },
	{ path: 'store', component: StoreComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: '**', component: FourOhFourComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);