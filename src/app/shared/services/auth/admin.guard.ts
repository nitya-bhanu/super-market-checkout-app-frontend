import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let router=inject(Router);
  let x=JSON.parse(sessionStorage.getItem('userResponse')!);
  if(!x.bool)
  {
    router.navigate(['/'])
    return false;
  }
  if(x.role==='admin')
  {
    return true;
  }
  else 
  {
    router.navigate(['home-page']);
    return false;
  }
};
