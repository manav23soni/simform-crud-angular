import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()

export class HelperService {

    constructor(
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {
    }

    showSuccessToast(msg) {
        this.toastr.success(msg);
    }

    showErrorToast(msg) {
        this.toastr.error(msg);
    }

    showInfoToast(msg) {
        this.toastr.info(msg);
    }

    showLoading() {
        this.spinner.show();
    }

    hideLoading() {
        this.spinner.hide();
    }

}
