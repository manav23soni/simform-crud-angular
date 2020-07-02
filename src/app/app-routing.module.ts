import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(l => l.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(s => s.SignupModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(d => d.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'routing',
        loadChildren: () => import('./modules/product-route/product-route.module').then(d => d.ProductRouteModule),
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
