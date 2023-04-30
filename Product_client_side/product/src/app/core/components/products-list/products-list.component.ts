import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerserviceService } from 'src/app/service/customerservice.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productDetail=[];
  filteredProducts=[];
  productName;
  category = new FormControl('');
  region = new FormControl('');
  min = new FormControl('');
  max = new FormControl('');
  isPriceValid = true;

  constructor(private customerservice: CustomerserviceService,
    private snackBar: MatSnackBar,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.customerservice.getProductList().subscribe((res)=>{
      this.productDetail=res.data,
      this.filteredProducts=res.data
    },(err)=>{
      this.snackBar.open(err.error.message, 'Dismiss', {
        duration: 2000,
      });
    })

  }
  showFilters(): void {
    const obj = {
      category: this.category.value,
      maxPrice: this.max.value,
      minPrice: this.min.value,
    };
    this.customerservice.getProductsBasedOnFilter(obj).subscribe((data) => {
      this.filteredProducts = data.data;
    });
  }

  viewDetailsOfProduct(id){
    this.customerservice.setProductId(id)
    this.route.navigateByUrl('productDetail');
  }
  checkProducts(event){
    //this.filteredProducts=this.productDetail
    this.filteredProducts=this.filteredProducts.filter((arr)=>arr.name.toLowerCase().includes(event.target.value.toLowerCase()))
  }

}
