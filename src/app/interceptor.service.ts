import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { setApiStatus } from './state';
import { selectFeatureToken } from './state/';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private tokenSnapshot = '';

  constructor(private store: Store, private router: Router) {
    store.select(selectFeatureToken).subscribe((token) => (this.tokenSnapshot = token));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (req.url.startsWith('/api')) {
      this.store.dispatch(setApiStatus({ apiStatus: { status: 'pending', message: '' } }));
      let headers: any;
      if (this.tokenSnapshot) {
        headers = { Authorization: 'Bearer ' + this.tokenSnapshot };
      }
      request = req.clone({ url: req.url.replace('/api', API_URL), setHeaders: headers });
    }

    return next.handle(request).pipe(
      tap((res) => {
        if (req.url.startsWith('/api') && (res as any).ok) {
          this.store.dispatch(setApiStatus({ apiStatus: { status: 'ready', message: '' } }));
        }
      }),
      catchError((err) => {
        if (!req.url.startsWith('/api')) {
          return throwError(() => err);
        }

        if (err.status === 404) {
          this.router.navigate(['notfound']);
        }

        // Handle expired token error
        if (req.url.endsWith('/profile') && err.status === 401) {
          this.store.dispatch(setApiStatus({ apiStatus: { status: 'ready', message: '' } }));
        } else {
          let message = err.error?.error?.message || err.message;
          if (err.status === 0 || err.status >= 500) {
            message = 'There was a problem talking to Cookbook servers';
          }
          this.store.dispatch(setApiStatus({ apiStatus: { status: 'fail', message } }));
        }

        return throwError(() => err);
      })
    );
  }
}

export const InterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true,
};
