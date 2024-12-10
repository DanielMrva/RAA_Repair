import { Directive, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserAuthenticatedService } from '@app/services/accessControl/user-authenticated.service';

@Directive({
  selector: '[appIsAuthenticated]',
  hostDirectives: [NgIf],  // Use NgIf directly in the directive
})
export class IsAuthenticatedDirective {
  private ngIf = inject(NgIf, { host: true });  //Injecting here rather than in constructor to pass variables
  private authService = inject(UserAuthenticatedService);

  @Input('appIsAuthenticatedElse') set elseTemplate(templateRef: NgIf['ngIfElse']) {
    this.ngIf.ngIfElse = templateRef;  // Bind the else template to NgIf
  }

  constructor() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.ngIf.ngIf = isAuthenticated;  // Control visibility with NgIf
    });
  }
}
