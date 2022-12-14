import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { resetApiStatus, selectApiStatus } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notificationTime: NodeJS.Timeout | undefined = undefined;
  apiStatus$ = this.store.select(selectApiStatus).pipe(
    tap((status) => {
      if (status.status !== 'fail') {
        return;
      }
      clearTimeout(this.notificationTime);
      this.notificationTime = setTimeout(() => {
        this.store.dispatch(resetApiStatus());
      }, 3000);
    })
  );
  title = 'cookbook-client';

  constructor(private store: Store) {}

  closeNotification() {
    clearTimeout(this.notificationTime);
    this.store.dispatch(resetApiStatus());
  }
}
