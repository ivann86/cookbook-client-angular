import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, HomeComponent],
  imports: [CommonModule, CoreRoutingModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
