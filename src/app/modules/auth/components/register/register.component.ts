import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(7),
        Validators.maxLength(50),
        Validators.required,
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    hobbies: new FormArray([new FormControl('')]),
  });

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  get hobbies() {
    return this.registerForm.get('hobbies') as FormArray;
  }

  addControl() {
    this.hobbies.push(new FormControl(''));
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: (value) => {
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił bład';
      },
    });
    console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());
  }

  ngOnInit(): void {
    this.registerForm.controls.email.hasError('email');
    // this.controls.username.addValidators(Validators.minLength(5));
    this.controls.username.setValue('test1');
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Email jest wymagany';
    }
    if (control.hasError('minlength')) {
      return 'Przekazałeś za mało znakuf';
    }

    return control.hasError('email') ? 'Niepoprawna forma' : '';
  }
}
