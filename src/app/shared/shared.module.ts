import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { OwnerActionsComponent } from './owner-actions/owner-actions.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@NgModule({
  declarations: [OwnerActionsComponent, RecipeCardComponent],
  imports: [CommonModule],
  exports: [RecipeCardComponent, OwnerActionsComponent],
  providers: [
    {
      provide: 'token',
      useValue: new BehaviorSubject(''),
    },
  ],
})
export class SharedModule {}
