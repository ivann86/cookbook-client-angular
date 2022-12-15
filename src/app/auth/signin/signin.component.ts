import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { logInUser, selectApiStatus } from 'src/app/state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  apiStatus$ = this.store.select(selectApiStatus);

  constructor(private store: Store) {}

  loginHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    this.store.dispatch(logInUser({ email, password }));
  }
}
