import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { registerUser, selectApiStatus } from 'src/app/state';
import { rePasswordValidator } from '../validators/rePasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    passwords: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[a-z]).*$/)]],
        rePassword: ['', []],
      },
      { validators: [rePasswordValidator('password', 'rePassword')] }
    ),
  });

  apiStatus$ = this.store
    .select(selectApiStatus)
    .pipe(tap((status) => (status.status === 'pending' ? this.form.disable() : this.form.enable())));

  constructor(private fb: FormBuilder, private store: Store) {}

  registerHandler() {
    if (this.form.invalid) {
      return;
    }

    const { email, firstName, lastName, passwords: { password } = {} } = this.form.value;
    this.store.dispatch(
      registerUser({
        email: email || '',
        firstName: firstName || '',
        lastName: lastName || '',
        password: password || '',
      })
    );
  }
}
