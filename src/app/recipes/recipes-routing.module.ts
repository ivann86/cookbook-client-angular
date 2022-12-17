import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipesComponent,
    title: 'Cookbook - Рецепти',
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: true,
      redirect: '/auth/signin',
    },
    title: 'Cookbook - Добавяне на рецепта',
  },
  {
    path: 'edit-recipe/:slug',
    component: EditRecipeComponent,
    canActivate: [AuthGuardService],
    data: {
      loggedInCanActivate: true,
      redirect: '/auth/signin',
    },
    title: 'Cookbook - Редактиране на рецепта',
  },
  {
    path: ':slug',
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
