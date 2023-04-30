import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerserviceService } from 'src/app/service/customerservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetail;
  constructor(private customerservice: CustomerserviceService,
    private snackBar: MatSnackBar,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.customerservice.getProductById(this.customerservice.getProductId()).subscribe((res)=>{
      this.productDetail=res.data
    },(err)=>{
      this.snackBar.open(err.error.message, 'Dismiss', {
        duration: 2000,
      });
    })
  }
  addToCart(){
    const obj={
      userId:localStorage.getItem('id'),
      productDetails:this.productDetail
    }
    this.customerservice.addtoCart(obj).subscribe((res)=>{
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 2000,
      });
    })
  }

}
