import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: false,
      redirect: '/',
    },
    title: 'Cookbook - Регистрация',
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: false,
      redirect: '/',
    },
    title: 'Cookbook - Вход',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: true,
      redirect: '/',
    },
    title: 'Cookbook - Профил',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
