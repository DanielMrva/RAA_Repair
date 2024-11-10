import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserAuthenticatedService } from '@app/services/accessControl/user-authenticated.service';

@Directive({
  selector: '[appIsAuthenticated]'
})
export class IsAuthenticatedDirective {

  private isAuthenticated: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userAuthenticatedService: UserAuthenticatedService
  ) { 
    this.userAuthenticatedService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      this.updateView();
    });
  }

  private updateView() {
    if (this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
