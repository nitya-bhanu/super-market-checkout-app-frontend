import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = () => {
  const router=inject(Router);
  const x=JSON.parse(sessionStorage.getItem('userResponse')!);

  //returning to sign in page if the user credentials are wrong 
  if(!x.bool)
  {
    router.navigate(['/'])
    return false;
  }

  //returning to the home page is the logged in user role is user only
  if(x.role==='user'){
    return true;
  }

  //going to admin page if the user is admin, to restrict the cart and order functionalities
  else {
    router.navigate(['admin-page'])
    return false;
  }
};
