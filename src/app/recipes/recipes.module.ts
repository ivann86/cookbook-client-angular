import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeWizardComponent } from './recipe-wizard/recipe-wizard.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
    RecipeWizardComponent,
    EditRecipeComponent,
  ],
  imports: [CommonModule, RecipesRoutingModule, ReactiveFormsModule],
})
export class RecipesModule {}
