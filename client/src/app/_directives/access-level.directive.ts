import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserAccessService } from '@app/services/accessControl/user-access.service';

@Directive({
  selector: '[appAccessLevel]'
})
export class AccessLevelDirective {

  private currentAccessLevel!: string | null;
  private requiredAccessLevel!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userAccessService: UserAccessService
  ) { 
    this.userAccessService.userAccessLevel$.subscribe(accessLevel => {
      this.currentAccessLevel = accessLevel;
      this.updateView();
    })

  }

  
  @Input() set appAccessLevel(requiredAccessLevel: string) {
    this.requiredAccessLevel = requiredAccessLevel;
    this.updateView();
  }

  private updateView() {
    if (this.currentAccessLevel === this.requiredAccessLevel) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  

}
