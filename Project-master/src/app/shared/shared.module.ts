import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule,
    InputsModule
  ],
  exports: [
    ButtonsModule,
    InputsModule
  ]
})
export class SharedModule { }
