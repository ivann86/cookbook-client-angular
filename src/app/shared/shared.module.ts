import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { OwnerActionsComponent } from './owner-actions/owner-actions.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@NgModule({
  declarations: [OwnerActionsComponent, RecipeCardComponent, PaginationComponent, RecipesListComponent],
  imports: [CommonModule],
  exports: [RecipeCardComponent, OwnerActionsComponent, PaginationComponent, RecipesListComponent],
  providers: [
    {
      provide: 'token',
      useValue: new BehaviorSubject(''),
    },
  ],
})
export class SharedModule {}
