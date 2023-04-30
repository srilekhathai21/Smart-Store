import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';
import { CustomerserviceService } from 'src/app/service/customerservice.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['name', 'price', 'quantity','icon'];
  cartProductsList=[];
  groupedCartData=[];
   ELEMENT_DATA= [];
   TotalPrice=0;
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  
  constructor(private customerservice: CustomerserviceService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerservice.getCart(localStorage.getItem('id')).subscribe((res)=>{
      this.cartProductsList=res.data
      const groupedEmployees$ = from(this.cartProductsList).pipe(
        groupBy(product => product.name),
        mergeMap(group => group
          .pipe(
            reduce((acc, cur) => {
                acc.values.push(cur);
                return acc;
              },
              { key: group.key, values: [] }
            )
          )
        ),
        toArray()
      );
      groupedEmployees$.subscribe((res)=>{
        this.groupedCartData=res
      });
      this.groupedCartData.forEach((data,i)=>{
        const obj={
          name:data.values[0].name,
          price:data.values[0].price,
          quantity:data.values.length
        }
        this.ELEMENT_DATA.push(obj)
        this.calculateTotalPrice();
      })
      this.dataSource.data=this.ELEMENT_DATA
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 2000,
      });
    },(err)=>{
      this.snackBar.open(err.message, 'Dismiss', {
        duration: 2000,
      });
    })
  }
  
  removeItemsFromCart(name){
    const elem = this.ELEMENT_DATA.find((value) => value.name===name);
    if (elem && elem.quantity>0) elem.quantity -= 1;
    this.calculateTotalPrice();
    const obj={
      userId:localStorage.getItem('id'),
      name:name
    }
    this.customerservice.deleteFromCart(obj).subscribe((res)=>{
      this.cartProductsList=res.data
      const groupedEmployees$ = from(this.cartProductsList).pipe(
        groupBy(product => product.name),
        mergeMap(group => group
          .pipe(
            reduce((acc, cur) => {
                acc.values.push(cur);
                return acc;
              },
              { key: group.key, values: [] }
            )
          )
        ),
        toArray()
      );
      groupedEmployees$.subscribe((res)=>{
        this.groupedCartData=res
      });
      this.groupedCartData.forEach((data,i)=>{
        const obj={
          name:data.values[0].name,
          price:data.values[0].price,
          quantity:data.values.length
        }
        this.ELEMENT_DATA.push(obj)
        this.calculateTotalPrice();
      })
      this.dataSource.data=this.ELEMENT_DATA
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 2000,
      });
    },(err)=>{
      this.snackBar.open(err.message, 'Dismiss', {
        duration: 2000,
      });
    })
  }
  
  calculateTotalPrice(){
    this.TotalPrice=0
    this.ELEMENT_DATA.forEach((item)=>{
      this.TotalPrice+=(item.quantity*item.price)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
