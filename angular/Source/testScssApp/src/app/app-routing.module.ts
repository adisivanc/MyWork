import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Aadhi added For Routing*/
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
/*Aadhi added For Routing*/

const routes: Routes = [
/*Aadhi added For Routing*/
{path:"home", component:HomeComponent},
{path:"contactus", component:ContactusComponent}
/*Aadhi added For Routing*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

export const RoutingComponent = [HomeComponent,ContactusComponent];
