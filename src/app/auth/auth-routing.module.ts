import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: false,
      redirect: '/',
    },
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: false,
      redirect: '/',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
