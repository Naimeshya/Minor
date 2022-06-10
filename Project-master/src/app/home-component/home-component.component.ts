import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './../shared/services/service.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('')
  });
  constructor(private route: Router, private service: ServiceService, private formBuilder: FormBuilder, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      username:['']
    })
  }
  next(post) {
    debugger
    console.log(post);
    const formdata= new FormData();
    formdata.append('username',post.username)
    this.service.depression_detector(formdata).subscribe(res=>{
      console.log(res)
      if(res){
        this.service.analises=res;
        this.route.navigate(['/Result']);
      }
      
    });
  
 
  }
}
