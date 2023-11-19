import { Component, OnInit } from '@angular/core';
import { RequestedProductSchema } from '../shared/models/requestedProduct';
import { RequestProductService } from '../shared/services/request-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requested-products',
  templateUrl: './requested-products.component.html',
  styleUrls: ['./requested-products.component.scss']
})
export class RequestedProductsComponent implements OnInit {
  requestedProducts!: Array<RequestedProductSchema>;
  showProduct!: RequestedProductSchema;
  bool=false;

  titleName!: string;

  constructor(private requestedProductServices: RequestProductService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoutes.params.subscribe(p => {
      this.titleName = p['productName'];
      this.requestedProductServices.getRequestedProducts().subscribe({
        next: (resp) => {
          this.requestedProducts = resp;
          // console.log(this.requestedProducts);
          this.requestedProducts.forEach(e => {
            if (e.title === this.titleName)
              this.showProduct = e;
          })
          if(this.titleName==='all'){
            this.bool=true;
          }
          else
          this.bool=false;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
}
