import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild('mymodal') model: ElementRef;

  public productList = [];
  public singleProduct = {};
  public productForm: FormGroup;
  public isSubmitted = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getProductList();
    this.resetProductForm();
  }

  resetProductForm() {
    this.productForm = this.fb.group({
      productName: [null, Validators.required],
      type: [null, Validators.required],
      description: [null]
    });
  }

  get productFormControls() { return this.productForm.controls; }

  async getProductList() {
    const productList = await this.authService.getProductList();
    this.productList = productList;
  }

  logout() {
    localStorage.clear();
    this.productList = [];
    this.router.navigate(['/login']);
  }

  async deleteProduct(productId: string) {
    const deleProduct = await this.authService.deleteProduct(productId);
    this.getProductList();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     
    }, (reason) => {
      console.log("cancel")
    });
  }

  async submitProductForm(value) {
    try {
      this.isSubmitted = true;
      if (this.productForm.invalid) {
        return;
      }
      if (this.singleProduct['id']) {
        const result = await this.authService.editProduct({...value, id: this.singleProduct['id'] });
        this.modalService.dismissAll();
        this.getProductList();
      } else {
        const result = await this.authService.addProduct(value);
        if (result) {
          this.modalService.dismissAll();
          this.getProductList();
        }
      }
    } catch (error) {
    }
  }

  async getSingleProduct(productId, type) {
    try {
     const getproduct = await this.authService.getByIdProduct(productId);
     this.singleProduct = getproduct;
     if (type === 'edit') {
       this.productForm.patchValue({
         productName: this.singleProduct['productName'],
         type: this.singleProduct['type'],
         description: this.singleProduct['description']
       });
     }
    } catch (error) {
    }
  }

  editProduct(productId, type) {
    if (productId) {
      this.getSingleProduct(productId, type);
    }
    this.open(this.model);
  }

}
