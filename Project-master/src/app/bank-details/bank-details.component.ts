import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ServiceService } from './../shared/services/service.service';


@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  formGroup: FormGroup
  BeneficiaryName: any;
  IFSCCode: any;
  AccountNumber: Number;
  rAccountNumber: number;
  user: any;
  constructor(private route: Router, private router: ActivatedRoute, private service: ServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'BeneficiaryName': [''],
      'IFSCCode': [''],
      'AccountNumber': [''],
      'rAccountNumber': [''],

    })
    this.router.queryParams.subscribe(parsam => {
      this.user = JSON.parse(atob(parsam.data));
      console.log(this.user)
    })
  }
  next(user) {
    if (!this.formGroup.value.BeneficiaryName) {
      return this.service.ErrorSuccess('Please Enter a  BeneficiaryName');
    }
    else if (!this.formGroup.value.IFSCCode) {
      return this.service.ErrorSuccess('Please Select the IFSCCode');
    }
    else if (!this.formGroup.value.AccountNumber) {
      return this.service.ErrorSuccess('Please Enter a AccountNumber');
    }
    else if (!this.formGroup.value.rAccountNumber) {
      return this.service.ErrorSuccess('Please Enter a Re-enter AccountNumber');
    }
    else if (this.formGroup.value.AccountNumber != this.formGroup.value.rAccountNumber) {
      return this.service.ErrorSuccess(' AccountNumber and Re-enter AccountNumber does not match');
  }

    let primary = {
     
      BeneficiaryName: user.BeneficiaryName,
      IFSCCode: user.IFSCCode,
      AccountNumber: user.AccountNumber,
      rAccountNumber: user.rAccountNumber,
    }
    this.user.bank= primary
    this.route.navigate(['/KYC-Document'], {
      queryParams: { data: btoa(JSON.stringify(this.user)) }
    });
  }

  back() {
    this.route.navigate(['/bussiness-details'])
  }
}
