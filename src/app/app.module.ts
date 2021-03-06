import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { firebaseSecret } from '../environments/firebase.secret';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
//workaround per https://github.com/angular/angularfire2/issues/1635 for AngularFireModule
import { FirebaseOptionsToken, FirebaseAppNameToken, FirebaseAppConfigToken } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, ActivatedRoute } from "@angular/router";
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductCardComponent } from './product-card/product-card.component';

library.add(faBoxOpen);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    OrdersComponent,
    HomeComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    NotFoundComponent,
    ProductsComponent,
    CheckoutComponent,
    LoginComponent,
    OrderSuccessComponent,
    EditProductComponent,
    ProductCardComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    //AngularFireModule.initializeApp(firebaseSecret), //standard usage is bugged, currently doesn't work
    //workaround per https://github.com/angular/angularfire2/issues/1635
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'login', component:LoginComponent},
      {path:'products', component:ProductsComponent},
      {path:'cart', component:ShoppingCartComponent},

      {path:'checkout', component:CheckoutComponent, canActivate: [AuthGuard]},
      {path:'order-success', component:OrderSuccessComponent, canActivate: [AuthGuard]},
      {path:'orders', component:OrdersComponent, canActivate: [AuthGuard]},

      {
        path:'manage-orders',
        component:ManageOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path:'manage-products',
        component:ManageProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      
      {path:'**', component:NotFoundComponent}
    ])
  ],
  providers: [
    //workaround per https://github.com/angular/angularfire2/issues/1635 for AngularFireModule
    { provide: FirebaseOptionsToken, useValue: firebaseSecret },
    { provide: FirebaseAppNameToken, useValue: undefined },
    { provide: FirebaseAppConfigToken, useValue: undefined },
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
