import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  matchPasswords(fg: FormGroup): ValidatorFn {
    return (control: AbstractControl) => {

      const password = control.get('password').value;
      const confirmPassword = control.get('confirmPassword').value;
      return password === confirmPassword ? null : { PasswordNotMatch: true };

    };
  }

  constructor() {}
}
