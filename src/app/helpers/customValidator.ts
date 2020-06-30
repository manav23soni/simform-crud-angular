// Default Modules
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  /* Validator for Email */
  static checkPatternEmail(c: FormControl): ValidationErrors {
    let isValid = false;
    const value = c.value;
    // tslint:disable-next-line:max-line-length
    const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (value == null || value === '' || emailPattern.test(value)) {
      isValid = true;
    }
    const message = {
      email: {
        message: 'Please fill valid email'
      }
    };
    return isValid ? null : message;
  }

  /* Validator for Password */
  static passwordValidate(c: FormControl): ValidationErrors {
    let isValid = false;
    const value = c.value;
    const passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i');
    if (value == null || value === '' || passwordPattern.test(value)) {
      isValid = true;
    }
    const message = {
      password: {
        message: 'Please fill valid password'
      }
    };
    return isValid ? null : message;
  }

}
