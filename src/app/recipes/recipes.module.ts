import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeWizardComponent } from './recipe-wizard/recipe-wizard.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
    RecipeWizardComponent,
    EditRecipeComponent,
  ],
  imports: [CommonModule, RecipesRoutingModule, ReactiveFormsModule, SharedModule],
})
export class RecipesModule {}
