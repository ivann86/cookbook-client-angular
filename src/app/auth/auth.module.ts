import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SigninComponent, RegisterComponent, ProfileComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
