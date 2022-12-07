import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RecipesModule } from './recipes/recipes.module';
import { InterceptorProvider } from './interceptor.service';
import { StoreModule } from '@ngrx/store';
import { tokenReducer, userReducer } from './state';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    RecipesModule,
    HttpClientModule,
    StoreModule.forRoot({ token: tokenReducer, user: userReducer }),
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

function appInit(auth: AuthService) {
  return () => new Promise((resolve) => auth.loadUser().subscribe({ next: resolve, error: resolve }));
}
