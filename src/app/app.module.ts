import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CardComponent } from './shared/components/card/card.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsService } from './shared/services/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { SharedModule } from './shared/shared.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { OrderTableComponent } from './order-table/order-table.component';
import { RequestedProductsComponent } from './requested-products/requested-products.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UsersComponent } from './users/users.component';
import { LoyaltyPaneComponent } from './loyalty-pane/loyalty-pane.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    CardComponent,
    HomePageComponent,
    CartComponent,
    SinglePageComponent,
    AdminPageComponent,
    UpdateProductsComponent,
    AddProductsComponent,
    AdminDashboardComponent,
    OrderTableComponent,
    RequestedProductsComponent,
    ProductRequestComponent,
    CheckoutPageComponent,
    OrderSummaryComponent,
    SignInComponent,
    SignUpComponent,
    OrderDetailsComponent,
    UsersComponent,
    LoyaltyPaneComponent,
    HomeNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    DatePipe
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
