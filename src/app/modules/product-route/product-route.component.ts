import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import {
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-route',
  templateUrl: './product-route.component.html',
  styleUrls: ['./product-route.component.css']
})

export class ProductRouteComponent implements OnInit {

  @ViewChild("mymodal") model: ElementRef;

  public routeForm: FormGroup;
  public routeParameterList: FormArray;
  public isSubmitted = false;
  public singleRouteDetail = {};
  public routeList = [];
  public methodsList = [
    { label: 'POST', value: 'post' },
    // { label: 'GET', value: 'get' },
    // { label: 'PUT', value: 'put' },
    // { label: 'DELETE', value: 'delete' }
  ];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.initializeMethod();
  }

  ngOnInit() {
    this.getRouteList();
  }

  initializeMethod() {
    this.initRouteForm();
    this.routeParameterList = this.routeForm.get('parameters') as FormArray;
  }

   /**
   * submitRouteForm() - save and edit route
   */
  async submitRouteForm() {
    this.isSubmitted = true;
    if (this.routeForm.valid) {
      console.log(this.routeForm.value);
      if (this.singleRouteDetail['id']) {
        const result = await this.authService.editRoute({ ...this.routeForm.value, id: this.singleRouteDetail['id'] });
        this.modalService.dismissAll();
        this.getRouteList();
        this.initializeMethod();
        this.singleRouteDetail = {};
      } else {
        const result = await this.authService.addRoute(this.routeForm.value);
        if (result) {
          this.modalService.dismissAll();
          this.getRouteList();
          this.initializeMethod();
        }
      }
    } else {
      alert('invalid form');
    }
  }

  /**
   * deleteRoute() - Delete routes
   * parameter - routeId
   */
  async deleteRoute(routeId: string) {
    const deleProduct = await this.authService.deleteRoute(routeId);
    this.getRouteList();
  }

  /**
   * getRouteList() - get All route that created by login user
   */
  async getRouteList() {
    const routeList = await this.authService.getRouteList();
    this.routeList = routeList;
    this.routeList.forEach((element) => {
      element.parameters = JSON.parse(element.parameters);
    });
  }

  // initialize Form
  initRouteForm() {
    this.routeForm = this.fb.group({
      type: ['', Validators.compose([Validators.required])],
      routeName: [null, Validators.compose([Validators.required])],
      parameters: this.fb.array([
        this.createRouteParameters()
      ]),
    });
  }

  // create form array
  createRouteParameters(): FormGroup {
    return this.fb.group({
      field: [null, Validators.compose([Validators.required])],
    });
  }

  async getSingleRoute(routeId, type) {
    try {
     const getproduct = await this.authService.getByIdroute(routeId);
     this.singleRouteDetail = getproduct;
     if (type === 'edit') {
       this.routeForm.patchValue({
         type: this.singleRouteDetail['type'],
         routeName: this.singleRouteDetail['routeName']
       });
       const control = <FormArray>this.routeForm.controls.parameters;
        JSON.parse(this.singleRouteDetail['parameters']).forEach((x) => {
          control.push(this.fb.group({
            field: x.field,
            id: x.id,
          }));
    });
     }
    } catch (error) {
    }
  }

  editRoute(productId, type) {
    if (productId) {
      this.initializeMethod();
      this.getSingleRoute(productId, type);
    }
    this.open(this.model);
  }

  get routeFormControls() {
    return this.routeForm.controls;
  }

  get routeParameterArrayForm(): FormArray {
    return this.routeForm.get('parameters') as FormArray;
  }

  getRouteParameterFormGroup(index): FormGroup {
    const formGroup = this.routeParameterList.controls[index] as FormGroup;
    return formGroup;
  }

  // Add parameter
  addRouteParameter() {
    this.routeParameterList.push(this.createRouteParameters());
  }

  // remove parameter
  removeRouteParameter(index) {
    this.routeParameterList.removeAt(index);
  }

  logout() {
    localStorage.clear();
    this.routeList = [];
    this.router.navigate(['/login']);
  }

  // Open model
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => { },
        (reason) => {
          console.log("cancel");
        }
      );
  }

}
