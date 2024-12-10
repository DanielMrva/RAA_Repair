import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER, AccessLevel } from '@app/utils/constants';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  private accessLevel: AccessLevel | null = null; // Initial access level can be null

  constructor(private store: Store<AppState>) {
    this.store.select(selectAccessLevel).subscribe(level => {
      this.accessLevel = level as AccessLevel;
    });
  }

  canEditField(field: string, editableFields: { [key in AccessLevel]: string[] }): boolean {
    const defaultAccessLevel: AccessLevel = ACCESS_LEVEL_USER;
    const level: AccessLevel = this.accessLevel ?? defaultAccessLevel;

    return editableFields[level].includes(field) || editableFields[level].includes('*');
  }

  setFormControlsAccessibility(form: FormGroup, editableFields: { [key in AccessLevel]: string[] }): void {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);
      if (control && !this.canEditField(controlName, editableFields)) {
        control.disable();
      } else {
        control?.enable();
      }
    });
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
