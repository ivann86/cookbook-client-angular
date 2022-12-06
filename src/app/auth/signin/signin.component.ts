import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    this.authService.logIn(email, password).subscribe({
      next: (res) => {},
    });
  }
}
