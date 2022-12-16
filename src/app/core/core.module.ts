import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, HomeComponent, FooterComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
