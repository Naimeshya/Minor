import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from './../shared/services/service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  invalidOtp = false;
  user: any;
  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
  });
  _id: any
  token: string;
  newOTP: string;
  data: any;
  newotp: Object;
  constructor(private route: Router, private router: ActivatedRoute, private service: ServiceService, private formbuilder: FormBuilder,) { }

  ngOnInit(): void {
   this.formGroup= this.formbuilder.group({
     username:['']
   });

  }



  
}
