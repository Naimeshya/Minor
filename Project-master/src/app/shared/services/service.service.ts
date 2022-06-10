import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = environment.URL;
  analises:any;
  headers = new HttpHeaders({
    safe: "true",
     });
  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router) { }





  
  sendOTP(post) {
    debugger
    return this.http.post(`${this.baseUrl}/v0.1/sendOTP`, post,{headers:this.headers});
  }
  depression_detector(post) {
    debugger
    return this.http.post(`${this.baseUrl}/twiter/depression_detector/`, post);
  }
  signUpV1(post) {
    debugger
    return this.http.post(`${this.baseUrl}/v0.1/signUpV1`, post,{headers:this.headers});


  }
  uploadDocuments(resData) {
    return this.http.post(`${this.baseUrl}/v0.1/uploadDocuments`, resData,{headers:{
      'skip':'true',
      'safe': 'true'
    }});
  }
  getBaseCategories() {
    debugger
    return this.http.get(`${this.baseUrl}/v0.1/getBaseCategories`,{headers:this.headers});

  }
  getCityByStateId(statesId,_id) {
    debugger
    return this.http.get(`${this.baseUrl}/v0.1/getCityByStateId?StatesId=${statesId}`,{headers:this.headers});

  }
  getStates(states) {
    debugger
    return this.http.get(`${this.baseUrl}/v0.1/getStates?States=${states}`,{headers:this.headers});
   
  }


  showToaster(message) {
    this.toastrService.success(message);
  }
  ErrorSuccess(message) {
    this.toastrService.error(message);
  }
  infoSuccess(message) {
    this.toastrService.info(message);
  }
  warningSuccess(message) {
    this.toastrService.warning(message);
  }
}
