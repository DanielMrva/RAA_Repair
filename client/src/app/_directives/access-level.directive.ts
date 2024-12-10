import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserAccessService } from '@app/services/accessControl/user-access.service';

@Directive({
  selector: '[appAccessLevel]'
})
export class AccessLevelDirective {
  private currentAccessLevel!: string | null;
  private requiredAccessLevel!: string | string[];
  private elseTemplateRef: TemplateRef<any> | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userAccessService: UserAccessService
  ) { 
    this.userAccessService.userAccessLevel$.subscribe(accessLevel => {
      this.currentAccessLevel = accessLevel;
      this.updateView();
    });
  }

  @Input() set appAccessLevel(requiredAccessLevel: string | string[]) {
    this.requiredAccessLevel = requiredAccessLevel;
    this.updateView();
  }

  @Input() set appAccessLevelElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.isAccessGranted()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (this.elseTemplateRef) {
      this.viewContainer.createEmbeddedView(this.elseTemplateRef);
    }
  }

  private isAccessGranted(): boolean {
    if (Array.isArray(this.requiredAccessLevel)) {
      return this.requiredAccessLevel.includes(this.currentAccessLevel!);
    }
    return this.requiredAccessLevel === this.currentAccessLevel;
  }
}
