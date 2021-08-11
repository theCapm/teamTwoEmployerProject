import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const clonedReq = req.clone({
            params: req.params.append('token', `${environment.apiKey}`)
        });

        return next.handle(clonedReq);
    }
}
