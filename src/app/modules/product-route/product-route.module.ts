import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRouteRoutingModule } from './product-route-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRouteComponent } from './product-route.component';


@NgModule({
  declarations: [
    ProductRouteComponent
  ],
  imports: [
    CommonModule,
    ProductRouteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductRouteModule { }
