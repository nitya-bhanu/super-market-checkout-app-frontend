import { Component, OnInit } from '@angular/core';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';
import { SharedDataService } from '../shared/services/shared-data.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-category-quantity',
  templateUrl: './category-quantity.component.html',
  styleUrls: ['./category-quantity.component.scss']
})
export class CategoryQuantityComponent implements OnInit{
  productsData!: prodcutsSchema[];
  public chart: any;
  cat1=0;
  cat2=0;
  cat3=0;
  cat4=0;

  constructor(private getProductServices: ProductsService,private sharedServices:SharedDataService,private router:Router) { }

  ngOnInit(): void {
    this.getProducts(0, 100, '', '', '', '');
  }

  getProducts(pageIndex: number, pageSize: number, orderManner: string, orderCriteria: string, categoryName: string, searchValue: string): void {
    this.getProductServices.getProducts(pageIndex, pageSize, orderManner, orderCriteria, categoryName, searchValue).subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.productsData = resp.data;

        this.productsData.forEach(e=>{
          if(e.category==='men\'s clothing')
          this.cat1++;
          else if(e.category==='women\'s clothing')
          this.cat2++;
          else if(e.category==='electronics')
          this.cat3++;
          else 
          this.cat4++;
        })

        this.chart=new Chart('acquisitions',
          {
            type: 'doughnut',
            data: {
              labels: ['Men category','Women category','Kids category','Electronics and essentials'],
              datasets: [
                {
                  label: 'Products Available',
                  data: [this.cat1,this.cat2,this.cat3,this.cat4],
                }
              ],
            },
            options: {
              aspectRatio:1
            }
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('subscribe event completed');
      }
    })
  }


}
