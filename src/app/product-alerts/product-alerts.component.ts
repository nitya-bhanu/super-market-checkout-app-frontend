import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit{
  productsData!:Array<prodcutsSchema>
  loader=false;

  constructor(private getProductServices:ProductsService,public dialogRef: MatDialogRef<ProductAlertsComponent>){}

  ngOnInit(): void {
    this.getProductServices.getProducts(0, 100, '', '', '', '').subscribe({
      next: (resp) => {
        this.loader=true;
        // console.log(resp.data);
        this.productsData = resp.data.filter(e=>{
          return e.quantity<10;
        });
        console.log(this.productsData);
        console.log('I am updated');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('subscribe event completed');
      }
    })   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
