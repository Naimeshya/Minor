import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from './../shared/services/file-upload.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './../shared/services/service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  formGroup: FormGroup;
  address: String;
  state: string;
  city: string;
  zipcode: any;
  FirstName: string
  email: any;
  user: any;
  values: any;
  files: any = [];
  fileToUpload1: File = null;
  private _id: any;
  data: any;
  constructor(private route: Router, private fileUploadService :FileUploadService,  private router: ActivatedRoute,private service: ServiceService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'email': [''],
      'FirstName': [''],
      'address': [''],
      'city': [''],
      //'mobileNo' : [''],
      'state': [''],
      'zipcode': [''],

    })
    this.router.queryParams.subscribe(parsam => {
      this.user = JSON.parse(atob(parsam.data));
      console.log('user',this.user)

    })
  }
  onKey(event){
         
    this.service.getStates(event).subscribe(res => {
      console.log(res);
   
      if (res['success']){
 this.values = res['states'];
     } err => {
        
       console.log(err);
       this.service.ErrorSuccess('Error');
     }});
    
    }
    onKey1(event,_id){
         
      this.service.getCityByStateId(event, this._id).subscribe(res => {
        console.log(res);
     
        if (res['success']){
   this.values = res['states'];
       } err => {
          
         console.log(err);
         this.service.ErrorSuccess('Error');
       }});
      
      }
       UploadInvoiceDoc(files: FileList) {
     
        this.fileToUpload1 = files.item(0);
        this.uploadDocuments(this.fileToUpload1)
      }
      uploadDocuments(data) {
        const formData: FormData = new FormData();
        formData.append('file',data, data.name);
        this.service.uploadDocuments(formData).subscribe(res => {
           
          
          console.log(res);
          this.data=res['data']
          if (res['success']) {
    
            this.service.showToaster('Uploaded  File Successfully');
    
          }
        }, err => {
           
          console.log(err);
          this.service.ErrorSuccess('Error');
        });
      }
    
  next(post) {

    if (!this.formGroup.value.FirstName) {
      return this.service.ErrorSuccess('Please Enter a  Name');
    }
    else if (!this.formGroup.value.city) {
      return this.service.ErrorSuccess('Please Select the city');
    }
    else if (!this.formGroup.value.address) {
      return this.service.ErrorSuccess('Please Enter a address');
    }
    else if (!this.formGroup.value.zipcode) {
      return this.service.ErrorSuccess('Please Enter a zipcode');
    }

    else if (!this.formGroup.value.state) {
      return this.service.ErrorSuccess('Please Enter a state');
    }
    else if (!this.formGroup.value.email) {
      return this.service.ErrorSuccess('Please Enter a Email Id');
    }
    else if (!this.formGroup.value.email) {
      return this.service.ErrorSuccess('Please Enter email address');
  }
  var atTheRate = /[@]/g;
  if (!this.formGroup.value.email.match(atTheRate)) {
      return this.service.ErrorSuccess('Invalid email address');
  }
    let primary = {
     
      FirstName: post.FirstName,
      city: post.city,
      state: post.state,
      zipcode: post.zipcode,
      email: post.email,
      address: post.address,
      personalImage:this.data
    }
    let screens={
      mobile:this.user.primary,
      personal: primary,
      bank:"",
      buissness:""
    }

    this.route.navigate(['/bussiness-details'], {
      queryParams: { data: btoa(JSON.stringify(screens)) }

    });
  }
  back() {
    this.route.navigate(['/create-account'])
  }
}
