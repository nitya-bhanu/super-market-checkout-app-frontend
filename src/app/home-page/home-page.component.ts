import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { prodcutsSchema } from '../shared/models/prodcuts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../shared/services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  order = 'asc';
  orderCriteria = 'title';
  categoryName = '';
  searchValue = '';
  setFieldsAndQueryForm!: FormGroup;
  productsData!: prodcutsSchema[];
  displayToken='user';
  isActive=false;


  constructor(private getProductServices: ProductsService, private formBuilder: FormBuilder,private sharedServices:SharedDataService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
    console.log('Home page resp: ',this.sharedServices.userResponse);
    this.getProducts(this.pageIndex, this.pageSize, this.order, this.orderCriteria, this.categoryName, this.searchValue);

    this.initialiseForm();
  }


  //initialising the form builder group
  initialiseForm(): void {
    this.setFieldsAndQueryForm = this.formBuilder.group({
      categoryFieldFormName: this.formBuilder.control(''),
      sortByFieldFormName:this.formBuilder.control('asc'),
      orderMannerFormName:this.formBuilder.control(''),
      searchQueryValueFormName:this.formBuilder.control('')
    })
    this.setFormSubscription();
  }

  //subscribing to form's value changes 
  setFormSubscription():void{
    this.setFieldsAndQueryForm.valueChanges.subscribe(e=>{
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

  //getting all the products from database
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
      orderMannerFormName:orderType
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

  //updating cart icon in case one adds something
  handleCartIcon(e:number){
    document.getElementById('cart-pill-number')!.innerText=e.toString();
  }

  //logout from the account
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
