import { Component, OnInit } from '@angular/core';
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

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {
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
          if(this.monthBool===false)
          this.monthlyData.push(pushObject);
        })
        this.chart=new Chart('acquisitions',
          {
            type: 'bar',
            data: {
              labels: this.monthlyData.map(row => row.month),
              datasets: [
                {
                  label: 'Orders per Month',
                  data: this.monthlyData.map(row => row.count),
                  // backgroundColor: 'blue'
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
      }
    })
  }
}
