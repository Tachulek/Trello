import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ListsComponent } from './lists/lists.component';
import { TablesComponent } from './tables/tables.component';
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { ComponentLoaderComponent } from './componentLoader.component'
import { RegisterComponent } from './register/register.component'

import { ComponentLoaderHostDirective } from './componentLoader-host.directive'


import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'table/:id', component: ListsComponent},
  {path: 'list/:id', component: TasksComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ListsComponent,
    TablesComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ComponentLoaderHostDirective,
    ComponentLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
