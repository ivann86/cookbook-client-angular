import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, withLatestFrom } from 'rxjs';
import { resetRecipesQuery, selectFeatureRecipesQuery, selectFeatureUser, setRecipesQuery } from 'src/app/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$ = this.store.select(selectFeatureUser);
  userStoreSubscription: Subscription | null = null;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.user$.pipe(withLatestFrom(this.store.select(selectFeatureRecipesQuery))).subscribe(([user, query]) => {
      const queryParams = this.route.snapshot.queryParams;
      this.store.dispatch(resetRecipesQuery());
      this.store.dispatch(
        setRecipesQuery({
          recipesQuery: Object.assign({}, query, queryParams, { owner: user.id }),
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription?.unsubscribe();
  }
}
