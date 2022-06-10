import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './../shared/services/service.service';

@Component({
  selector: 'app-kyc-document',
  templateUrl: './kyc-document.component.html',
  styleUrls: ['./kyc-document.component.scss']
})
export class KycDocumentComponent implements OnInit {
  formGroup: FormGroup;
  BeneficiaryName: any;
  IFSCCode: any;
  AccountNumber: Number;
  rAccountNumber: number;
  GSTDocument: any;
  PanCardNumber: any;
  AadharCardNumber: any;
  BusinessAddress: String;
  state1: string;
  city1: string;
  zipcode1: any;
  BusinessName: string;
  category: string;
  mobile: any;
  AnnualRevenue: string;
  Businessperson: any
  address: String;
  state: string;
  city: string;
  zipcode: any;
  FirstName: string
  email: any;
  user: any;
  constructor(private route: Router, private router: ActivatedRoute, private service: ServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    var hist = history.state.data
    this.formGroup = this.formBuilder.group({
      'GSTDocument': [''],
      'PanCardNumber': [''],
      'AadharCardNumber': [''],
 });
    this.router.queryParams.subscribe(parsam => {
      this.user = JSON.parse(atob(parsam.data));
console.log('user=>',this.user);
    })
  }
  next(user) {
    debugger


    let primary = {
      mobile:this.user.mobile.mobile,
      FirstName: this.user.personal.FirstName,
      city: this.user.personal.city,
      state: this.user.personal.state,
      zipcode: this.user.personal.zipcode,
      email: this.user.personal.email,
      address: this.user.personal.address,
      businessemail: this.user.buissness.businessemail,
      BusinessAddress: this.user.buissness.BusinessAddress,
      BusinessName: this.user.buissness.BusinessName,
      businesscity: this.user.buissness.businesscity,
      businessstate: this.user.buissness.businessstate,
      businesszipcode: this.user.buissness.businesszipcode,
      AnnualRevenue: this.user.buissness.AnnualRevenue,
      Businessperson: this.user.buissness.Businessperson,
      vendortype: this.user.buissness.vendortype,
      targetaudience: this.user.buissness.targetaudience,
      businessmobile: this.user.buissness.businessmobile,
       BeneficiaryName: this.user.bank.BeneficiaryName,
      IFSCCode: this.user.bank.IFSCCode,
      AccountNumber: this.user.bank.AccountNumber,
      rAccountNumber: this.user.bank.rAccountNumber,
       GSTDocument: user.GSTDocument,
      PanCardNumber: user.PanCardNumber,
      AadharCardNumber: user.AadharCardNumber,
      BaseCategoryIDs:this.user.buissness.BaseCategoryIDs
        }

    if( (!this.formGroup.value.AadharCardNumber) && (this.user.AnnualRevenue == '20 lakhs')){
      return this.service.ErrorSuccess('Please Enter a AadharCardNumber');
    }
 
    else if( (!this.formGroup.value.AadharCardNumber)&&(!this.formGroup.value.PanCardNumber) && (this.user.AnnualRevenue == '20-50 lakhs')){
      return this.service.ErrorSuccess('Please Enter a AadharCardNumber and PanCardNumber');
    }
    else if( (!this.formGroup.value.AadharCardNumber)&&(!this.formGroup.value.GSTDocument)&&(!this.formGroup.value.PanCardNumber) && (this.user.AnnualRevenue == '20-50 lakhs')){
      return this.service.ErrorSuccess('Please Enter a AadharCardNumber and PanCardNumber and GSTDocument');
    }
console.log(primary);
    this.service.signUpV1(primary).subscribe(res => {
      debugger;
      console.log(res);
      if (res['success']) {
        console.log(res);

        this.service.showToaster(' Successfully signup');
        //window.location.href='https://vendorportalfrontdev.bharatemarket.in/Dashboard'
 
      }
    }, err => {

      console.log(err);
      this.service.ErrorSuccess(' unsuccessfully signup');
    })
  }

  back() {
    this.route.navigate(['/bank-details'])
  }
}
