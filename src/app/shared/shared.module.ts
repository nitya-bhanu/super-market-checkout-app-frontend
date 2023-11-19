import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
  declarations: [
    CartCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports:[
    CartCardComponent,
    AppRoutingModule
  ]
})
export class SharedModule { }
