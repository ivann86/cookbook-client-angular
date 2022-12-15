import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOutUser, selectFeatureUser } from 'src/app/state/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$ = this.store.select(selectFeatureUser);

  constructor(private store: Store) {}

  signOut() {
    this.store.dispatch(logOutUser());
  }
}
