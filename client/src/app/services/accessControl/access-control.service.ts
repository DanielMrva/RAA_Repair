import { Injectable } from '@angular/core';
import { ACCESS_LEVEL_USER, AccessLevel } from '@app/utils/constants';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserAccessService } from './user-access.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  private accessLevel: AccessLevel | null = null; // Initial access level can be null

  constructor(private userAccessService: UserAccessService) {
    this.userAccessService.userAccessLevel$
      .subscribe(level => {
        this.accessLevel = level;
      });
  }

  canEditField(path: string, editableFields: { [key in AccessLevel]: string[] }): boolean {
    const defaultAccessLevel: AccessLevel = ACCESS_LEVEL_USER;
    const level: AccessLevel = this.accessLevel ?? defaultAccessLevel;
  
    return editableFields[level].some(field => {
      // If the config says '*', everything is editable
      if (field === '*') return true;
  
      // If there's an exact match (non-array control), we're good
      if (path === field) return true;
  
      // For arrays: if the stored field is "symptoms", the actual path might be "symptoms.0"
      // So we allow that if path starts with "symptoms." or is exactly "symptoms"
      return path === field || path.startsWith(field + '.');
    });
  }
  

  private setFormControlsAccessibilityRecursive(
    control: AbstractControl,
    path: string,
    editableFields: { [key in AccessLevel]: string[] }
  ) {
    if (control instanceof FormGroup) {
      for (const childName of Object.keys(control.controls)) {
        const childControl = control.controls[childName];
        const childPath = path ? `${path}.${childName}` : childName;
        this.setFormControlsAccessibilityRecursive(childControl, childPath, editableFields);
        console.log(`${childControl.value} - ${childPath}`)

      }
    } else if (control instanceof FormArray) {
      console.log(`This is a form Array of ${control.controls}`)
      control.controls.forEach((childControl, index) => {
        const childPath = path ? `${path}.${index}` : `${index}`;
        this.setFormControlsAccessibilityRecursive(childControl, childPath, editableFields);
        console.log(`${childControl.value} - ${childPath}`)

      });
    } else if (control instanceof FormControl) {
      // The actual enable/disable decision:
      if (this.canEditField(path, editableFields)) {
        control.enable({ emitEvent: false });
      } else {
        control.disable({ emitEvent: false });
      }
    }
  }
  
  public setFormControlsAccessibility(
    formGroup: FormGroup,
    editableFields: Record<AccessLevel, string[]>
  ) {
    for (const controlName of Object.keys(formGroup.controls)) {
      const control = formGroup.controls[controlName];
      // Kick off recursion for each top-level field
      this.setFormControlsAccessibilityRecursive(control, controlName, editableFields);
    }
  }
  
  enableAllControls(formGroup: FormGroup): Set<string> {
    const enabledControls = new Set<string>();
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control?.disabled) {
        enabledControls.add(controlName);
        control.enable();
      }
    });
    return enabledControls;
  }

  restoreDisabledControls(formGroup: FormGroup, disabledControls: Set<string>): void {
    disabledControls.forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control) {
        control.disable();
      }
    });
  }

}
