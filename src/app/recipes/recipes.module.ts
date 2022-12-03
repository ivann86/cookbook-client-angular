import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
