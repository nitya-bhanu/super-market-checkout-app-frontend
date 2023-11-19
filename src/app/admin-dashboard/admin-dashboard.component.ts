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
    this.getGreetings();
    this.getRequestedProducts();
    this.getAllOrders();
    this.setDigitalTime();
  }
  getGreetings() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12)
      this.greetings = 'Good Morning!';
    else if (hrs >= 12 && hrs <= 17)
      this.greetings = 'Good Afternoon!';
    else if (hrs >= 17 && hrs <= 24)
      this.greetings = 'Good Evening!';
  }

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

  setMonthlyOrders() {

    this.currentMonthtotal = 0;
    this.pastMonthTotal = 0;

    var myDate = new Date();
    var month = myDate.getMonth();

    this.currentMonthOrders = [];
    this.pastMonthSchema = [];

    this.allOrders.forEach(e => {
      let x = e.orderDate.slice(5, 7);
      if (x === (month - 1).toString()) {
        this.pastMonthSchema.push(e);
        this.pastMonthTotal = e.totalMoney;
      }
      else if (x === month.toString()) {
        this.currentMonthOrders.push(e);
        this.currentMonthtotal = e.totalMoney;
      }
    })
  }


  setDigitalTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    let x = (h < 10) ? "0" + h.toString() : h.toString();
    let y = (m < 10) ? "0" + m : m;
    let z = (s < 10) ? "0" + s : s;

    var time = x + ":" + y + ":" + z + " " + session;
    document.getElementById("MyClockDisplay")!.innerText = time;
    document.getElementById("MyClockDisplay")!.textContent = time;

    setInterval(this.setDigitalTime, 1000);
  }

}
