import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { tap, mapTo, map, finalize } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector,
    // private loaderService: NgxSpinnerService/**UNHIDE FOR LOADER */
  ) { }

  intercept(req, next) {
    // this.loaderService.show();/**UNHIDE FOR LOADER */
    let tokenizedReq = req.clone();
  



    const token = sessionStorage.getItem('token');
    tokenizedReq = tokenizedReq.clone({
      setHeaders: {
        Authorization: `${token}`
      },
      body: tokenizedReq.body
    });
    return next.handle(tokenizedReq)

  }
}