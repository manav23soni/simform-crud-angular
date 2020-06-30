import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()

export class AppHttpService {
    APP_URL = environment.API_URL;

    constructor(
        public http: HttpClient,
    ) {
    }

    post(URL, data) {
        const response = this.http.post(this.APP_URL + URL, data);
        return response;
    }

    postWithHeader(URL, data, xAuthToken) {
        const response = this.http.post(this.APP_URL + URL, data, {
            headers: this.createAuthorizationHeader(xAuthToken)
        }).pipe(map(res => res));
        return response;
    }

    putWithHeader(URL, data, xAuthToken) {
        const response = this.http.put(this.APP_URL + URL, data, {
            headers: this.createAuthorizationHeader(xAuthToken)
        }).pipe(map(res => res));
        return response;
    }

    createAuthorizationHeader(token) {
        const headerOptions = {};
        if (token) {
            headerOptions['x-access-token'] = token;
        }
        const headers = new HttpHeaders(headerOptions);
        return headers;
    }

    getWithHeader(URL, xAuthToken) {
        const response = this.http.get(this.APP_URL + URL, {
            headers: this.createAuthorizationHeader(xAuthToken)
        }).pipe(map(res => res));
        return response;
    }

    get(URL) {
        const response = this.http.get(this.APP_URL + URL).pipe(map(res => res));
        return response;
    }

    deleteWithHeader(URL, xAuthToken) {
        const response = this.http.delete(this.APP_URL + URL, {
            headers: this.createAuthorizationHeader(xAuthToken)
        }).pipe(map(res => res));
        return response;
    }

}
