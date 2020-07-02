import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public apiURL: string = environment.API_URL;

  constructor(
    private appHttpService: AppHttpService,
    private helperService: HelperService,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userInfo')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginFormData): any {
    const self = this;
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.post('/user/login', loginFormData)
        .subscribe((res: any) => {
          self.currentUserSubject.next(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          localStorage.setItem('token', JSON.stringify(res.token));
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error);
          reject(err);
        });
    });
  }

  signup(signupFormData): any {
    const self = this;
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.post('/user/signup', signupFormData)
        .subscribe((res: any) => {
          self.currentUserSubject.next(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          localStorage.setItem('token', JSON.stringify(res.token));
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error);
          reject(err);
        });
    });
  }

  getProductList(): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.getWithHeader('/product/1', token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  deleteProduct(productId: string): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.deleteWithHeader('/product/' + productId,  token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  addProduct(product): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.postWithHeader('/product/', product, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  editProduct(product): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.putWithHeader('/product/', product, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  getByIdProduct(productId): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.getWithHeader('/product/get/' + productId, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          // this.helperService.showSuccessToast(res.message);
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  addRoute(route): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.postWithHeader('/', route, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  editRoute(route): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.putWithHeader('/', route, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  getRouteList(): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.getWithHeader('/getAll', token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  getByIdroute(routeId): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.getWithHeader('/getSingle/' + routeId, token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          resolve(res.data);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  deleteRoute(routeId): any {
    const token = JSON.parse(localStorage.getItem('token'));
    this.helperService.showLoading();
    return new Promise((resolve, reject) => {
      this.appHttpService.deleteWithHeader('/' + routeId,  token)
        .subscribe((res: any) => {
          this.helperService.hideLoading();
          this.helperService.showSuccessToast(res.message);
          resolve(res);
        }, (err) => {
          this.helperService.hideLoading();
          this.helperService.showErrorToast(err.error.error || 'Internal Server Error');
          reject(err);
        });
    });
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
