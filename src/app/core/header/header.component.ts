import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOutUser, selectFeatureUser } from 'src/app/state/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$ = this.store.select(selectFeatureUser);

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  get searchValue() {
    return this.route.snapshot.queryParams['search'];
  }

  search(search: string) {
    if (!search) {
      return;
    }
    this.router.navigate(['recipes'], { queryParams: { search } });
  }

  signOut() {
    this.store.dispatch(logOutUser());
  }
}
