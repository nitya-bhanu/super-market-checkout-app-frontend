import { Component } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { orderSchema } from '../shared/models/orders';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {


  allOrders!: Array<orderSchema>;
  janOrders!: Array<orderSchema>
  febOrders!: Array<orderSchema>
  marchOrders!: Array<orderSchema>
  aprilOrders!: Array<orderSchema>
  mayOrders!: Array<orderSchema>
  juneOrders!: Array<orderSchema>
  julyOrders!: Array<orderSchema>
  augustOrders!: Array<orderSchema>
  septOrders!: Array<orderSchema>
  octOrders!: Array<orderSchema>
  novOrders!: Array<orderSchema>
  decOrders!: Array<orderSchema>
  monthlyOrderArray!: Array<Array<orderSchema>>;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.getAllOrders();

  }


  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (resp) => {
        this.allOrders = resp;
        console.log('Here: ',this.allOrders);
        this.setMonthlyOrders();
        this.setMonthlyArray();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setMonthlyOrders() {
    console.log('New here: ',this.allOrders);
    
    this.janOrders = [];
    this.febOrders = [];
    this.marchOrders = [];
    this.aprilOrders = [];
    this.mayOrders = [];
    this.juneOrders = [];
    this.julyOrders = [];
    this.augustOrders = [];
    this.septOrders = [];
    this.octOrders = [];
    this.novOrders = [];
    this.decOrders = [];

    this.allOrders.forEach(e => {
      let x = e.orderDate.slice(5, 7);
      if (x === '01')
        this.janOrders.push(e);
      else if (x === '02')
        this.febOrders.push(e);
      else if (x === '03')
        this.marchOrders.push(e);
      else if (x === '04')
        this.aprilOrders.push(e);
      else if (x === '05')
        this.mayOrders.push(e);
      else if (x === '06')
        this.juneOrders.push(e);
      else if (x === '07')
        this.julyOrders.push(e);
      else if (x === '08')
        this.augustOrders.push(e);
      else if (x === '09')
        this.septOrders.push(e);
      else if (x === '10')
        this.octOrders.push(e);
      else if (x === '11')
        this.novOrders.push(e);
      else if (x === '12')
        this.decOrders.push(e);
    })
  }
  
  setMonthlyArray(){
    this.monthlyOrderArray = [];
    this.monthlyOrderArray.push(this.janOrders,this.febOrders,this.marchOrders,this.aprilOrders,this.mayOrders,this.juneOrders,this.julyOrders,this.augustOrders,this.septOrders,this.octOrders,this.novOrders,this.decOrders);
    console.log('Nov', this.novOrders);
    
  }

}
