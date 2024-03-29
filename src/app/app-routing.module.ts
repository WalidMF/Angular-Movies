import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { MovieContentComponent } from './Components/movie-content/movie-content.component';
import { FavoriteComponent } from './Components/favorite/favorite.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:CreateAccountComponent},
  {path: '', redirectTo:"/main/home", pathMatch:"full"},
  {path: 'main', component:MainComponent, children: [
    {path: 'home', component:HomeComponent},
    {path: 'movie-content/:id', component:MovieContentComponent},
    {path: 'favorite', component:FavoriteComponent}

  ]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
