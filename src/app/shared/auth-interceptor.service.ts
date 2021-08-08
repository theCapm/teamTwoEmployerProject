import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';

import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // return next.handle(req);
        // const headerDict = {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //     'Access-Control-Allow-Headers': 'Content-Type'
        // };
        // const paramsDict = { token: `${environment.apiKey}` };

        // const requestOptions = { headers: new HttpHeaders(headerDict) };

        // const clonedReq = req.clone({
        //     params: req.params.set('token', `${environment.apiKey}`)
        // });

        // console.log(`AuthInterceptorService URL ${clonedReq.url}`);
        // console.log(`AuthInterceptorService URL with params ${clonedReq.urlWithParams}`);
        // return next.handle(clonedReq);

        const authReq = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Access-Control-Allow-Headers', 'Content-Type'),
            params: req.params.append('token', `${environment.apiKey}`)
        });

        console.log('Intercepted HTTP call', authReq)

        return next.handle(authReq);
    }
}
