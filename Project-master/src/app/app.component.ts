import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BharatEMarket';
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   center:true,
  
  //   responsive: {
  //     0: {
  //       items: 3
  //     },
  //     400: {
  //       items: 3
  //     },
  //     740: {
  //       items: 5
  //     },
  //     940: {
  //       items: 3
  //     }
  //   },
  //   nav: true
  // }
  constructor(private route: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  images=[
    {path:"../assets/Images/screens/screens/X - 1.png"},
    {path:"../assets/Images/screens/screens/X - 2.png"},
    {path:"../assets/Images/screens/screens/X - 3.png"},
    {path:"../assets/Images/screens/screens/X - 4.png"},
    {path:"../assets/Images/screens/screens/X - 5.png"}
  ]


}