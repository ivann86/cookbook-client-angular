import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { setError } from './state';
import { selectFeatureToken } from './state/auth.selectors';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private token$: Observable<string>;

  constructor(private store: Store) {
    this.token$ = store.select(selectFeatureToken);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (req.url.startsWith('/api')) {
      let headers: any;
      let token: string = '';
      this.token$.subscribe((val) => {
        token = val;
      });
      if (token) {
        headers = { Authorization: 'Bearer ' + token };
      }
      request = req.clone({ url: req.url.replace('/api', API_URL), setHeaders: headers });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        this.store.dispatch(setError({ message: err.error?.error?.message || err.message }));
        return EMPTY;
      })
    );
  }
}

export const InterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true,
};
