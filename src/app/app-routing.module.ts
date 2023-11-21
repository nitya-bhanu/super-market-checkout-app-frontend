import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { RequestedProductsComponent } from './requested-products/requested-products.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UsersComponent } from './users/users.component';
import { adminGuard } from './shared/services/auth/admin.guard';
import { userGuard } from './shared/services/auth/user.guard';
import { LoyaltyPaneComponent } from './loyalty-pane/loyalty-pane.component';


const routes: Routes = [
  {
    path:"",
    component:SignInComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path:"home-page",
    component:HomePageComponent,
    canActivate:[userGuard]
  },
  {
    path:"admin-page",
    component:AdminPageComponent,
    canActivate:[adminGuard]
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate:[userGuard]
  },
  {
    path: "display/:prodId",
    component: SinglePageComponent
  },
  {
    path: "updateProduct/:prodId",
    component: UpdateProductsComponent,
    canActivate:[adminGuard]
  },
  {
    path:"product-request",
    component:ProductRequestComponent,
    canActivate:[userGuard]
  },
  {
    path: "addProduct",
    component: AddProductsComponent,
    canActivate:[adminGuard]
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    canActivate:[adminGuard],
    children: [
      {
        path: 'order-table',
        component: OrderTableComponent,
      },
      {
        path:"order-details",
        component:OrderDetailsComponent,
      },
      {
        path:'users',
        component:UsersComponent
      },
      {
        path:'loyalty-points',
        component:LoyaltyPaneComponent
      },
      {
        path:':productName',
        component:RequestedProductsComponent
      }
    ]
  },
  {
    path:"order-summary",
    component:OrderSummaryComponent
  },
  {
    path:"single-pane",
    children:[
      {
        path:':prodId',
        component:SinglePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
