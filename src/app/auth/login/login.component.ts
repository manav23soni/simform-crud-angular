import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../helpers/customValidator';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.resetLoginForm();
  }

  resetLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.checkPatternEmail])],
      password: [null, Validators.compose([Validators.required, CustomValidators.passwordValidate])]
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  async submitLoginForm(value) {
    try {
      this.isSubmitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      const loginResult = await this.authService.login(value);
      if (loginResult) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
    }
  }

}
