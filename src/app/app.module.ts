import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InterceptorProvider } from './interceptor.service';
import { Store, StoreModule } from '@ngrx/store';
import {
  apiStatusReducer,
  recipeQueryReducer,
  recipeReducer,
  recipesListReduces,
  recipesQueryReducer,
  recipesSampleReducer,
  recipesStatsReducer,
  tokenReducer,
  userReducer,
} from './state';
import { filter } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffectsService } from './state/recipe.effects.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { authenticate, authStatusReducer, selectAuthStatus } from './state/auth.state';
import { AuthEffectsService } from './state/auth.effects.service';

const appInit = (store: Store) => (): Promise<any> => {
  store.dispatch(authenticate());
  return new Promise((resolve) => {
    store
      .select(selectAuthStatus)
      .pipe(filter((status) => status !== 'pending'))
      .subscribe(() => resolve(true));
  });
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer,
      apiStatus: apiStatusReducer,
      authStatus: authStatusReducer,
      token: tokenReducer,
      user: userReducer,
      samples: recipesSampleReducer,
      recipesQuery: recipesQueryReducer,
      recipesStats: recipesStatsReducer,
      recipes: recipesListReduces,
      recipeQuery: recipeQueryReducer,
      recipe: recipeReducer,
    }),
    AppRoutingModule,
    EffectsModule.forRoot([AuthEffectsService, RecipeEffectsService]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [Store],
    },
    InterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
