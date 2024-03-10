import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:CreateAccountComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
