import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*Two Way Binding*/
import { FormsModule } from '@angular/forms';
/*Two Way Binding*/

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OthersComponent } from './others/others.component';

import { ServiceoneService } from './serviceone.service';


/*HTTP*/
import { HttpClientModule } from '@angular/common/http';
/*HTTP*/



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OthersComponent,
	RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [ServiceoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
