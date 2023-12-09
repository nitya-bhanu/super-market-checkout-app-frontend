import { Component, Inject, OnInit } from '@angular/core';
import { RequestedProductSchema } from '../shared/models/requestedProduct';
import { RequestProductService } from '../shared/services/request-product.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-requested-products',
  templateUrl: './requested-products.component.html',
  styleUrls: ['./requested-products.component.scss']
})
export class RequestedProductsComponent implements OnInit {
  requestedProducts!: Array<RequestedProductSchema>;
  showProduct!: RequestedProductSchema;
  bool = false;
  loader=false;

  titleName!: string;

  constructor(private requestedProductServices: RequestProductService,public dialogRef: MatDialogRef<RequestedProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: MatDataFetched) { }

  ngOnInit(): void {
    console.log('Mat Data: ',this.data);
    this.titleName=this.data.title;
    this.requestedProductServices.getRequestedProducts().subscribe({
      next: (resp) => {
        this.loader=true;
        this.requestedProducts = resp;
        // console.log(this.requestedProducts);
        this.requestedProducts.forEach(e => {
          if (e.title === this.titleName)
            this.showProduct = e;
        })
        if (this.titleName === 'all') {
          this.bool = true;
        }
        else
          this.bool = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface MatDataFetched{
  title:string;
}
