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
import { CategoryQuantityComponent } from './category-quantity/category-quantity.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { GetReviewComponent } from './get-review/get-review.component';
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { LocateProductsComponent } from './locate-products/locate-products.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { MonthlyCompareComponent } from './monthly-compare/monthly-compare.component';
import { BrandOnboardingComponent } from './brand-onboarding/brand-onboarding.component';
import { ShowBrandRequestsComponent } from './show-brand-requests/show-brand-requests.component';
import { SendAnnouncementsComponent } from './send-announcements/send-announcements.component';


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
    CategoryQuantityComponent,
    PostReviewComponent,
    GetReviewComponent,
    QrCodeScannerComponent,
    LocateProductsComponent,
    UserOrdersComponent,
    ProductAlertsComponent,
    MonthlyCompareComponent,
    BrandOnboardingComponent,
    ShowBrandRequestsComponent,
    SendAnnouncementsComponent,
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
    DatePipe,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
