import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeResolverService } from './resolvers/recipe-resolver.service';
import { RecipesListResolverService } from './resolvers/recipes-list-resolver.service';

const routes: Routes = [
  {
    path: 'recipes',
    resolve: { recipes: RecipesListResolverService },
    component: RecipesComponent,
  },
  {
    path: 'recipes/:id',
    resolve: { recipe: RecipeResolverService },
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
