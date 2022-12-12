import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RecipesModule } from './recipes/recipes.module';
import { InterceptorProvider } from './interceptor.service';
import { StoreModule } from '@ngrx/store';
import {
  apiStatusReducer,
  errorReducer,
  recipesListReduces,
  recipesQueryReducer,
  recipesStatsReducer,
  tokenReducer,
  userReducer,
} from './state';
import { AuthService } from './shared/auth.service';
import { catchError, EMPTY, Observable } from 'rxjs';

const appInit = (auth: AuthService) => (): Observable<any> => auth.loadUser().pipe(catchError(() => EMPTY));

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    RecipesModule,
    HttpClientModule,
    StoreModule.forRoot({
      apiStatus: apiStatusReducer,
      token: tokenReducer,
      user: userReducer,
      recipesQuery: recipesQueryReducer,
      recipesStats: recipesStatsReducer,
      recipes: recipesListReduces,
      error: errorReducer,
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AuthService],
    },
    InterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
