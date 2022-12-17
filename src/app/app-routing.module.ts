import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Cookbook - Начало',
  },
  {
    path: '**',
    redirectTo: 'notfound',
    title: 'Cookbook - Page Not Found',
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
    title: 'Cookbook - Page Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
