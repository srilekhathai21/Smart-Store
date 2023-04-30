import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { ProductsListComponent } from './core/components/products-list/products-list.component';
import { ProductDetailsComponent } from './core/components/product-details/product-details.component';
import{AuthGuardGuard} from'./core/auth-guard.guard'
import { CartDetailsComponent } from './core/components/cart-details/cart-details.component';

const routes: Routes = [{ path: 'header', component: HeaderComponent },
{ path: 'header', component: HeaderComponent },  
{ path: 'footer', component: FooterComponent },
{ path: '', component: HomepageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'product', component: ProductsListComponent,canActivate:[AuthGuardGuard] },
{ path: 'productDetail', component: ProductDetailsComponent },
{ path: 'cartDetail', component: CartDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
