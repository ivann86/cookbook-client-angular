import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesQueryResolverService } from './resolvers/recipes-query-resolver.service';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    // resolve: { query: RecipesQueryResolverService },
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: true,
      redirect: '/signin',
    },
  },
  {
    path: 'edit-recipe/:slug',
    component: EditRecipeComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: true,
      redirect: '/signin',
    },
  },
  {
    path: 'recipes/:slug',
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
