import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  let router=inject(Router);
  let x=JSON.parse(sessionStorage.getItem('userResponse')!);
  if(!x.bool)
  {
    router.navigate(['/'])
    return false;
  }
  if(x.role==='user'){
    return true;
  }
  else {
    router.navigate(['admin-page'])
    return false;
  }
};
