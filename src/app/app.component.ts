import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, timeInterval } from 'rxjs';
import { resetError, selectError, setError } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notificationTime: NodeJS.Timeout | undefined = undefined;
  error$ = this.store.select(selectError).pipe(
    tap(() => {
      clearTimeout(this.notificationTime);
      this.notificationTime = setTimeout(() => {
        this.store.dispatch(resetError());
      }, 3000);
    })
  );
  title = 'cookbook-client';

  constructor(private store: Store) {}

  closeNotification() {
    clearTimeout(this.notificationTime);
    this.store.dispatch(resetError());
  }
}
