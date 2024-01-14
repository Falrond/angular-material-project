import { Component } from '@angular/core';
import { UserLoginData } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  userData: UserLoginData = {
    username: '',
    password: '',
  };

  errorMessage = '';

  constructor(private authService: AuthService) {}
  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        console.log(value);
        if (value.length === 0) {
          this.errorMessage = 'Podano nieprawidłowe dane do logowania';
        }
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }
}
