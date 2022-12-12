import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { selectApiStatus } from 'src/app/state';
import { rePasswordValidator } from '../validators/rePasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    passwords: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: [rePasswordValidator('password', 'rePassword')] }
    ),
  });
  apiStatus$ = this.store
    .select(selectApiStatus)
    .pipe(tap((status) => (status.status === 'pending' ? this.form.disable() : this.form.enable())));

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {}

  registerHandler() {
    if (this.form.invalid) {
      return;
    }

    const { email, firstName, lastName, passwords: { password } = {} } = this.form.value;
    this.authService.register(email!, firstName!, lastName!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: console.error,
    });
  }
}
