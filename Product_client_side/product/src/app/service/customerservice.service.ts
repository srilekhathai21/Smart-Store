import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../app/shared/models/customer.model';
import { Response } from '../../app/shared/models/response.model';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CustomerserviceService {
  url = environment.apiUrl + '/customer';
  cartUrl = environment.apiUrl + '/cart';
  productId;
  constructor(private http: HttpClient) {}

  addUser(user: Customer): Observable<Response> {
    return this.http.post<Response>(this.url + '/signup', user);
  }
  checkUser(user): Observable<Response> {
    return this.http.post<Response>(this.url + '/login', user);
  }

  addtoCart(user): Observable<Response> {
    return this.http.post<Response>(this.url+'/addProductsToCart' ,user);
  }

  getCart(id): Observable<any> {
    return this.http.get(this.url + `/getProductsFromcart?id=${id}`);
  }
  deleteFromCart(product): Observable<any> {
    return this.http.delete<Response>(
      this.url +
        `/deleteProductFromCart?userId=${product.userId}&name=${product.name}`)
  }
  getProductList(): Observable<any> {
    return this.http.get<Response>(
      `${this.url}/getProducts`);
  }
  getProductById(id): Observable<any> {
    return this.http.get<Response>(
      `${this.url}/getProductById?id=${id}`);
  }
  getProductsBasedOnFilter(obj): Observable<any> {
    return this.http.post<Response>(
      `${this.url}/getProductsBasedOnFilter`,obj);
  }
  setProductId(id){
    this.productId=id
  }
  getProductId(){
    return this.productId
  }
}
