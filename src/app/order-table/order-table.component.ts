import { Component, OnDestroy, OnInit } from '@angular/core';
import { orderSchema } from '../shared/models/orders';
import { OrderService } from '../shared/services/order.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})


//generating bar chart for visualisation
export class OrderTableComponent implements OnInit {

  loader=false;

  orderData!: Array<orderSchema>;
  greetings='';
  public chart: any;
  monthBool=false;

  monthlyData=[{
    month:'',
    count:0
  }];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders():void {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {
        this.loader=true;
        this.orderData = resp
        this.orderData.forEach(e=>{
          let countIn=0;
          const x=e.orderDate.slice(5,7);
          this.orderData.forEach(p=>{
            if(x===p.orderDate.slice(5,7))
            countIn++;
          })
          const pushObject={
            month:x,
            count:countIn
          }
          this.monthlyData.forEach(e=>{
            if(e.month===pushObject.month){
              this.monthBool=true;
            }
          })
          this.monthlyData.sort((a,b)=> a.month.localeCompare(b.month));

          if(this.monthBool===false)
          this.monthlyData.push(pushObject);
        })
        this.chart=new Chart('acquisitions-2',
          {
            type: 'bar',
            data: {
              labels: this.monthlyData.map(row => row.month),
              datasets: [
                {
                  label: 'Orders per Month',
                  data: this.monthlyData.map(row => row.count),
                  backgroundColor: 'black'
                }
              ],
             
            },
            options: {
              aspectRatio:1,
              scales:{
                x:{
                  title:{
                    display:true,
                    text:'Month',
                  }
                },
                y:{
                 title:{
                  display:true,
                  text:'Number of Products Sold'
                 }
                }
              }
            }
          }
        );
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
