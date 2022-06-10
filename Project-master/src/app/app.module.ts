import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BuissnessDetailsComponent } from './buissness-details/buissness-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { KycDocumentComponent } from './kyc-document/kyc-document.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { TokenInterceptorService } from './../app/shared/TokenService/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BankDetailsComponent, 
    HomeComponentComponent,
    PersonalDetailsComponent,
    BuissnessDetailsComponent,
    CreateAccountComponent,
    KycDocumentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    // CarouselModule,
    NgbModule,
    SlickCarouselModule,
    DropDownsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
