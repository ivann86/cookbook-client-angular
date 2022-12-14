import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { selectFeatureUser } from 'src/app/state/';

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
