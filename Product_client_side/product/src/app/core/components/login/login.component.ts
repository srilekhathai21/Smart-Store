import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerserviceService } from '../../../service/customerservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]],
    });
  }
  sendDetails(formData: any): void {
     {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      this.customerservice.checkUser(data).subscribe(
        (res) => {
          localStorage.setItem('token', res.data);
          localStorage.setItem('name', res.status);
          localStorage.setItem('id', res.message);
          localStorage.setItem('isCustomer', 'true');
         this.snackBar.open("Logged in Successfully", 'Dismiss', {
            duration: 3000,
          }); 
          this.route.navigateByUrl('product');
        },
        (err) => {
          this.snackBar.open(err.error.message, 'Dismiss', {
            duration: 2000,
          });
        }
      );
    }
  }
  signup(): void {
    this.route.navigateByUrl('/signup');
  }
}
