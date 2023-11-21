import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router=inject(Router);
  const x=JSON.parse(sessionStorage.getItem('userResponse')!);

  //return to sign in page if the user credentials are wrong
  if(!x.bool)
  {
    router.navigate(['/'])
    return false;
  }

  //going to admin page if the role is admin only 
  if(x.role==='admin')
  {
    return true;
  }

  //going to home page if the user is not admin
  else 
  {
    router.navigate(['home-page']);
    return false;
  }
};
