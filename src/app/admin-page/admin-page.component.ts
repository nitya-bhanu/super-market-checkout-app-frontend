import { Component } from '@angular/core';
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
export class AdminPageComponent {
  pageSize: number = 10;
  pageIndex: number = 0;
  order: string = 'asc';
  orderCriteria: string = 'title';
  categoryName: string = '';
  searchValue: string = '';
  setFieldsAndQueryForm!: FormGroup;
  productsData!: prodcutsSchema[];
  displayToken='admin';
  nextElementSibling: any;
  classList: any;
  isActive:boolean=false;

  constructor(private getProductServices: ProductsService, private formBuilder: FormBuilder,private sharedServices:SharedDataService,private router:Router) { }

  ngOnInit(): void {
    this.getProducts(this.pageIndex, this.pageSize, this.order, this.orderCriteria, this.categoryName, this.searchValue);
    this.initialiseForm();
  }


  initialiseForm(): void {
    this.setFieldsAndQueryForm = this.formBuilder.group({
      categoryFieldFormName: this.formBuilder.control(''),
      sortByFieldFormName:this.formBuilder.control('asc'),
      orderMannerFormName:this.formBuilder.control(''),
      searchQueryValueFormName:this.formBuilder.control('')
    })
    this.setFormSubscription();
  }

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

  selectCategory(catPara:string){
    this.setFieldsAndQueryForm.setValue({
      categoryFieldFormName:catPara,
      sortByFieldFormName:this.orderCriteria,
      orderMannerFormName:this.order,
      searchQueryValueFormName:this.searchValue
    })
    console.log(this.setFieldsAndQueryForm.value);
  }

  selectOrderByField(orderByPara:string){
    this.setFieldsAndQueryForm.setValue({
      sortByFieldFormName:orderByPara,
      categoryFieldFormName:this.categoryName,
      orderMannerFormName:this.order,
      searchQueryValueFormName:this.searchValue
    })
  }

  selectOrderManner(orderType:string){
    this.setFieldsAndQueryForm.setValue({
      sortByFieldFormName:this.orderCriteria,
      categoryFieldFormName:this.categoryName,
      orderMannerFormName:orderType,
      searchQueryValueFormName:this.searchValue
    })
  }

  handlePagination(e: any) {
    this.getProducts(e.pageIndex,e.pageSize,this.order,this.orderCriteria,this.categoryName,this.searchValue);
  }

  handleToggle(){
    console.log(this.isActive);
    this.isActive=!this.isActive;
  }

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
 