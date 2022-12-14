import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { OwnerActionsComponent } from './owner-actions/owner-actions.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [OwnerActionsComponent, RecipeCardComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [RecipeCardComponent, OwnerActionsComponent, PaginationComponent],
  providers: [
    {
      provide: 'token',
      useValue: new BehaviorSubject(''),
    },
  ],
})
export class SharedModule {}
