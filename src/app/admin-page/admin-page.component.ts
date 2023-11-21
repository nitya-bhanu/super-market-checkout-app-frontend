import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { ProductsService } from '../shared/services/products.service';
import { debounceTime } from 'rxjs';
import { SharedDataService } from '../shared/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{

  pageSize = 10;
  pageIndex= 0;
  order= 'asc';
  orderCriteria = 'title';
  categoryName = '';
  searchValue = '';
  setFieldsAndQueryForm!: FormGroup;
  productsData!: prodcutsSchema[];
  displayToken='admin';
  isActive=false;

  constructor(private getProductServices: ProductsService, private formBuilder: FormBuilder,private sharedServices:SharedDataService,private router:Router) { }

  ngOnInit(): void {
    this.getProducts(this.pageIndex, this.pageSize, this.order, this.orderCriteria, this.categoryName, this.searchValue);
    this.initialiseForm();
  }


  //initialising the forms builder
  initialiseForm(): void {
    this.setFieldsAndQueryForm = this.formBuilder.group({
      categoryFieldFormName: this.formBuilder.control(''),
      sortByFieldFormName:this.formBuilder.control('asc'),
      orderMannerFormName:this.formBuilder.control(''),
      searchQueryValueFormName:this.formBuilder.control('')
    })
    this.setFormSubscription();
  }

  //subscribing to the form change
  setFormSubscription():void{
    this.setFieldsAndQueryForm.valueChanges.pipe(debounceTime(500)).subscribe(e=>{
      console.log("value of other fields: ",e.searchQueryValueFormName);
      
      if(e.categoryFieldFormName!='')
      this.categoryName=e.categoryFieldFormName;

      if(e.sortByFieldFormName!='')
      this.orderCriteria=e.sortByFieldFormName;

      if(e.orderMannerFormName!='')
      this.order=e.orderMannerFormName;

      this.searchValue=e.searchQueryValueFormName;
      this.getProducts(this.pageIndex,this.pageSize,this.order,this.orderCriteria,this.categoryName,this.searchValue);
    })
  }

  //getting all the products listed in database
  getProducts(pageIndex: number, pageSize: number, orderManner: string, orderCriteria: string, categoryName: string, searchValue: string): void {
    this.getProductServices.getProducts(pageIndex, pageSize, orderManner, orderCriteria, categoryName, searchValue).subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.productsData = resp.data;
        console.log('I am updated');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('subscribe event completed');
      }
    })
  }

  //selecting the category from control value 
  selectCategory(catPara:string){
    this.setFieldsAndQueryForm.setValue({
      categoryFieldFormName:catPara,
      sortByFieldFormName:this.orderCriteria,
      orderMannerFormName:this.order,
      searchQueryValueFormName:this.searchValue
    })
    console.log(this.setFieldsAndQueryForm.value);
  }

  //selecting or changing the field form control
  selectOrderByField(orderByPara:string){
    this.setFieldsAndQueryForm.setValue({
      sortByFieldFormName:orderByPara,
      categoryFieldFormName:this.categoryName,
      orderMannerFormName:this.order,
      searchQueryValueFormName:this.searchValue
    })
  }

  //selecting the order manner 
  selectOrderManner(orderType:string){
    this.setFieldsAndQueryForm.setValue({
      sortByFieldFormName:this.orderCriteria,
      categoryFieldFormName:this.categoryName,
      orderMannerFormName:orderType,
      searchQueryValueFormName:this.searchValue
    })
  }

  //handling the pagination
  handlePagination(e: any) {
    this.getProducts(e.pageIndex,e.pageSize,this.order,this.orderCriteria,this.categoryName,this.searchValue);
  }

  //toggles for the card components
  handleToggle(){
    console.log(this.isActive);
    this.isActive=!this.isActive;
  }

  //logout features implementation
  logOutFromWindow(){
    const x={
      userId: '',
      bool: false,
      role: ''
    }
    this.sharedServices.setUserResponse(x);
    this.router.navigate(['/']);
  }

}
 