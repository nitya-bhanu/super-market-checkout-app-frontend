import { Component, OnInit } from '@angular/core';
import { LoyaltyService } from '../shared/services/loyalty.service';
import { LoyaltyScehma } from '../shared/models/loyalty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loyalty-pane',
  templateUrl: './loyalty-pane.component.html',
  styleUrls: ['./loyalty-pane.component.scss']
})
export class LoyaltyPaneComponent implements OnInit {

  loader=false;

  loyaltyList!: Array<LoyaltyScehma>;
  loyaltyNewValue = '';

  constructor(private loyaltyService: LoyaltyService, private router: Router) { }

  ngOnInit(): void {
    this.getLoyalties();
  }

  //getting all the loyalty criterias
  getLoyalties(): void {
    this.loyaltyService.getAllLoyaltyPoints().subscribe({
      next: (resp) => {
        this.loader=true;
        this.loyaltyList = resp;
      },
      error: (err) => {
        console.log('Error Fetching: ', err);
      }
    })
  }

  //setting up the value of discounts to be updated 
  onKeySetValue(e: any): void {
    this.loyaltyNewValue = e.target.value;
  }

  //setting up the updated loyalty discounts
  setLoyalty(loyaltyId: string, levelValue: number): void {
    const x = {
      levelValue: levelValue,
      loyaltyId: loyaltyId,
      cashInValue: Number(this.loyaltyNewValue)
    }
    this.loyaltyService.updateLoyaltyPoints(x).subscribe({
      next: (resp) => {
        console.log(resp);
        this.getLoyalties();
      },
      error: (err) => {
        console.log('error posting: ', err);
      }
    })
  }
}
