import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RecipesModule } from './recipes/recipes.module';
import { InterceptorProvider } from './interceptor.service';
import { BehaviorSubject } from 'rxjs';

export const UserState = new InjectionToken<any>('UserState');
const userState = new BehaviorSubject({});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, AuthModule, RecipesModule, HttpClientModule],
  providers: [
    InterceptorProvider,
    {
      provide: UserState,
      useValue: userState,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
