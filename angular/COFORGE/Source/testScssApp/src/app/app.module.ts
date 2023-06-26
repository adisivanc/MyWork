import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*Aadhi added For Routing*/
import { AppRoutingModule,RoutingComponent } from './app-routing.module';
/*Aadhi added For Routing*/

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PipeComponent } from './pipe/pipe.component';
import { BindComponent } from './pipe/bind/bind.component';
import { PreloginComponent } from './login/prelogin/prelogin.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SqrtPipe } from './app.sqrt';

@NgModule({
  declarations: [
    SqrtPipe,
    AppComponent,
    LoginComponent,
    PipeComponent,
    BindComponent,
    PreloginComponent,
    FormsComponent,
    HomeComponent,
    ContactusComponent,
	RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
