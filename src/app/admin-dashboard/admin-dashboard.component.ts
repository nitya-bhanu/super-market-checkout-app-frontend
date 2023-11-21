import { Component, OnInit } from '@angular/core';
import { RequestedProductSchema } from '../shared/models/requestedProduct';
import { RequestProductService } from '../shared/services/request-product.service';
import { OrderService } from '../shared/services/order.service';
import { orderSchema } from '../shared/models/orders';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  greetings = '';
  dataData = [{}];

  allOrders!: Array<orderSchema>;
  currentMonthOrders!: Array<orderSchema>
  pastMonthSchema!: Array<orderSchema>

  currentMonthtotal!: number;
  pastMonthTotal!: number;

  requestedProducts!: Array<RequestedProductSchema>;

  constructor(private requestedProductServices: RequestProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getRequestedProducts();
    this.getAllOrders();
    this.setDigitalTime();
  }

  //listing all the prodcuts requested by users
  getRequestedProducts() {
    this.requestedProductServices.getRequestedProducts().subscribe({
      next: (resp) => {
        this.requestedProducts = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //getting all the orders till date
  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {
        this.allOrders = resp;
        this.setMonthlyOrders();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //filtering orders month wise, pushing them into each month's array
  setMonthlyOrders() {

    this.currentMonthtotal = 0;
    this.pastMonthTotal = 0;

    const myDate = new Date();
    let month = myDate.getMonth();

    this.currentMonthOrders = [];
    this.pastMonthSchema = [];

    this.allOrders.forEach(e => {
      const x = e.orderDate.slice(5, 7);
      month=month++;
      console.log('CUT ',x);
      console.log('curr MonthFetch: ',month);
      let stringcurrMonth='';
      let stringPrevMonth='';
      if(month<11){
        if(month===10){
          stringcurrMonth=month.toString();
          stringPrevMonth='0'+(month-1).toString();
        }
        else {
          stringcurrMonth='0'+(month).toString();
          stringPrevMonth='0'+(month-1).toString();
        }
      }
      
      if (x ===stringPrevMonth) {
        this.pastMonthSchema.push(e);
        this.pastMonthTotal = e.totalMoney;
      }
      else if (x === stringcurrMonth) {
        this.currentMonthOrders.push(e);
        this.currentMonthtotal = e.totalMoney;
      }
    })
  }


  //setting the time on dashboard of admin as digital clock
  setDigitalTime() {
    const date = new Date();
    let h = date.getHours(); // 0 - 23
    const m = date.getMinutes(); // 0 - 59
    const s = date.getSeconds(); // 0 - 59
    let session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    const x = (h < 10) ? "0" + h.toString() : h.toString();
    const y = (m < 10) ? "0" + m : m;
    const z = (s < 10) ? "0" + s : s;

    const time = x + ":" + y + ":" + z + " " + session;
    document.getElementById("MyClockDisplay")!.innerText = time;
    document.getElementById("MyClockDisplay")!.textContent = time;

    setInterval(this.setDigitalTime, 1000);
  }

}
