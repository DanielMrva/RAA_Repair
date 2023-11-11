import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { AppState } from "@app/_store/app.state";
import { selectAccessLevel } from "@app/_store/_auth-store/auth.selectors";

export const roleGuard = (router: Router, store: Store<AppState>) => (route: ActivatedRouteSnapshot): boolean => {
  const expectedRoles: Array<string> = route.data["role"];

  const selectAccessLevel$ = store.select(selectAccessLevel).subscribe(accessLevel => {
    if (accessLevel !== null && !expectedRoles.includes(accessLevel)) {
      router.navigateByUrl('/');
    }
  });

  // Remember to unsubscribe to avoid memory leaks
  selectAccessLevel$.unsubscribe();

  return true;
};
