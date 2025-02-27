import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { orgLocNames } from '@app/_store/_location-store/location.selectors';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

/**
 * An async validator that checks whether the provided location name
 * already exists for the given organization.
 */
export function locationNameAsyncValidator(orgName: string | null, store: Store<AppState>): AsyncValidatorFn {

  const usedOrgName = orgName ?? '';  

  if (!usedOrgName) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => of(null);
  }
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return store.select(orgLocNames(usedOrgName)).pipe(
      first(), // take the first emission once the store is ready
      map((filteredNames: string[]| null) => {
        const names = filteredNames ?? [];
        const input = control.value;
        // If the input exists in the filtered list, return an error.
        if (input && names.includes(input)) {
          return { locationNameExists: true };
        }
        return null;
      })
    );
  };
}
