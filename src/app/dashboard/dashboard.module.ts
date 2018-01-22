import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent, SideMenuComponent,
  ControlSidebarComponent, FooterComponent } from './shared/shared';
import { LandingComponent } from './landing/landing.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductModule } from './products/shared/product.module';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderModule } from './orders/shared/order.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ProductModule,
    OrderModule
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideMenuComponent,
    ControlSidebarComponent,
    FooterComponent,
    LandingComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
    OrderListComponent,
    OrderDetailsComponent
  ]
})
export class DashboardModule { }
