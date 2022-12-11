import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { resetError, selectError, setError } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error$ = this.store.select(selectError).pipe(tap(() => setTimeout(() => this.store.dispatch(resetError()), 3000)));
  title = 'cookbook-client';

  constructor(private store: Store) {}

  closeNotification() {
    this.store.dispatch(resetError());
  }
}
