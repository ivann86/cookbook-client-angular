import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { selectApiStatus } from 'src/app/state';
import { selectFeatureUser } from 'src/app/state/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$: Observable<any>;

  constructor(private authService: AuthService, private store: Store, private router: Router) {
    this.user$ = store.select(selectFeatureUser);
  }

  signOut() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
