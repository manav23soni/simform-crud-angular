import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../helpers/customValidator';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.resetSignUpForm();
  }

  resetSignUpForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: [null, Validators.compose([Validators.required, CustomValidators.checkPatternEmail])],
      password: [null, Validators.compose([Validators.required, CustomValidators.passwordValidate])]
    });
  }

  get signupFormControls() { return this.signupForm.controls; }

  /**
   * submitSignupForm() - signup request
   * parameter - value (form data)
   */
  async submitSignupForm(value) {
    try {
      this.isSubmitted = true;
      if (this.signupForm.invalid) {
        return;
      }
      const loginResult = await this.authService.signup(value);
      if (loginResult) {
        this.router.navigate(['/routing']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
