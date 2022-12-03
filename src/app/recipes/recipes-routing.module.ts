import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
