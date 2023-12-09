import { Component, OnInit } from '@angular/core';
import { orderSchema } from '../shared/models/orders';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-monthly-compare',
  templateUrl: './monthly-compare.component.html',
  styleUrls: ['./monthly-compare.component.scss']
})
export class MonthlyCompareComponent implements OnInit {
  allOrders!: Array<orderSchema>;
  firstMonth!: Array<orderSchema>;
  secondMonth!: Array<orderSchema>;
  monthSelect1 = '01';
  monthSelect2='01';

  allOrdersLoader = false;
  firstMonthLoader = false;
  secondMonthLoader = false;

  MonthData = [
    { monthName: 'January', monthTag: '01' },
    { monthName: 'February', monthTag: '02' },
    { monthName: 'March', monthTag: '03' },
    { monthName: 'April', monthTag: '04' },
    { monthName: 'May', monthTag: '05' },
    { monthName: 'June', monthTag: '06' },
    { monthName: 'July', monthTag: '07' },
    { monthName: 'August', monthTag: '08' },
    { monthName: 'September', monthTag: '09' },
    { monthName: 'October', monthTag: '10' },
    { monthName: 'November', monthTag: '11' },
    { monthName: 'December', monthTag: '12' }];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();

  }



  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {

        this.allOrdersLoader = true;

        this.allOrders = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  getFirstMonthOrders(): void {
    // console.log(this.monthSelect1);
    // console.log(this.allOrders);

    this.firstMonth = this.allOrders.filter(e => {
      return (e.orderDate[5] + e.orderDate[6] === this.monthSelect1)
    })
    console.log(this.firstMonth);
  }

  getSecondMonthOrders(): void {
    this.secondMonth = this.allOrders.filter(e => {
      return (e.orderDate[5] + e.orderDate[6] === this.monthSelect2)
    })
    console.log(this.secondMonth);
  }

}
