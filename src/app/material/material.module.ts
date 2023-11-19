import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  exports:[
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
