import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductRouteComponent } from './product-route.component';


const routes: Routes = [
  {
    path: '',
    component: ProductRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouteRoutingModule { }
