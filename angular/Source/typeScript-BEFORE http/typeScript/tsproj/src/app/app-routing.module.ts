import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OthersComponent } from './others/others.component';


const routes: Routes = [
	{path:"login", component:LoginComponent},
	{path:"dashboard", component:DashboardComponent},
	{path:"others", component:OthersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [LoginComponent,DashboardComponent,OthersComponent];
