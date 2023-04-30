import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
  ],
  imports: [CommonModule, 
    SharedModule, 
    ReactiveFormsModule,
    FormsModule],
  exports: [HeaderComponent, FooterComponent, HomepageComponent],
})
export class CoreModule {}
