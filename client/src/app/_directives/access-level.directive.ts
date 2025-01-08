import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserAccessService } from '@app/services/accessControl/user-access.service';
import { AccessLevel } from '@app/utils/constants';

@Directive({
  selector: '[appAccessLevel]'
})
export class AccessLevelDirective {
  private currentAccessLevel!: AccessLevel | null;
  private requiredAccessLevel!: AccessLevel | AccessLevel[];
  private elseTemplateRef: TemplateRef<any> | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userAccessService: UserAccessService
  ) { 
    this.userAccessService.userAccessLevel$.subscribe(() => this.updateView());
  }

  @Input() set appAccessLevel(requiredAccessLevel: AccessLevel | AccessLevel[]) {
    this.requiredAccessLevel = requiredAccessLevel;
    this.updateView();
  }

  @Input() set appAccessLevelElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.userAccessService.hasLevel(this.requiredAccessLevel)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (this.elseTemplateRef) {
      this.viewContainer.createEmbeddedView(this.elseTemplateRef);
    }
  }

}
