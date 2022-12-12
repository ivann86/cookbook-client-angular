import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/auth.service';
import { selectApiStatus } from 'src/app/state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  apiStatus$ = this.store.select(selectApiStatus);

  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {}

  loginHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    this.authService.logIn(email, password).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: console.error,
    });
  }
}
