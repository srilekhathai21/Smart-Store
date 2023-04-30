import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterContentChecked {
  constructor(
    private cdrf: ChangeDetectorRef,
    private router: Router
  ) {}
  checksignin;
  iscustomer = false;
  isVendor = false;
  name;
  ngAfterContentChecked(): void {
    this.cdrf.detectChanges();
    this.name = localStorage.getItem('name');
    this.checksignin = this.check();
  }
  /* tslint:disable */
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const scrollPosition = window.pageYOffset;
  }

  check(): boolean {
    if (localStorage.getItem('token') !== null) {
       if (localStorage.getItem('isCustomer') === 'true') {
        this.iscustomer = true;
      }
      return true;
    } else {
      return false;
    }
  }
  signoutCustomer(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('isCustomer');
    this.iscustomer = false;
    this.router.navigate(['/']);
  }
  
  showCart(): void {
    this.router.navigate(['/cartDetail']);
  }
  showBooking(): void {
    this.router.navigate(['/booking']);
  }
  showProfile(): void {
    this.router.navigate(['/profile']);
  }
  redirect(): void {
    if (localStorage.getItem('isVendor') === 'true') {
      this.router.navigateByUrl('/vendor');
    } else {
      this.router.navigateByUrl('');
    }
  }
  login(){
    this.router.navigateByUrl('login')
  }
  productList(){
    this.router.navigateByUrl('product')
  }
}
