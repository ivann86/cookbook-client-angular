import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserState } from './app.module';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(@Inject(UserState) private userState: BehaviorSubject<any>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (req.url.startsWith('/api')) {
      let headers: any;
      let token: string = '';
      this.userState.subscribe((value) => {
        token = value.token;
      });
      if (token) {
        headers = { Authorizatioin: 'Bearer ' + token };
      }
      if (this.userState.subscribe())
        request = req.clone({ url: req.url.replace('/api', API_URL), setHeaders: headers });
    }
    return next.handle(request);
  }
}

export const InterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true,
};
