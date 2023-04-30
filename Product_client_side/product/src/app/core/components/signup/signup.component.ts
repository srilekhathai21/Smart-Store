import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerserviceService } from '../../../service/customerservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  titleAlert = 'This field is required';

  constructor(private fb: FormBuilder,
    private customerservice: CustomerserviceService,
    private route: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.intializeLoginForm();
  }
  intializeLoginForm(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]],
    });
  }
  
  signup(): void {
    this.route.navigateByUrl('/login');
  }
  onCustomerSubmit(): void {
    const customerFormValue = this.signUpForm.getRawValue();
    delete customerFormValue.confirmPassword;
    delete customerFormValue.otp;
    this.customerservice.addUser(customerFormValue).subscribe(
      (res) => {
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 3000,
        });
        setTimeout(() => {
          this.route.navigateByUrl('/login');
        }, 3000);
      },
      (err) => {
        this.route.navigateByUrl('/signup');
        this.snackBar.open(err.error.message, 'Dismiss', {
          duration: 2000,
        });
      }
    );
  }
}
