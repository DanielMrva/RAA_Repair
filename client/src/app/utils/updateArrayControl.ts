import { FormArray, FormControl } from '@angular/forms';

/**
 * Synchronizes a FormArray with a new array of string values, updating only if there are differences.
 * @param newValues - Array of new values to set in the FormArray.
 * @param arrayControl - The FormArray control to update.
 */
export function updateArrayControl(newValues: string[], arrayControl: FormArray): void {
  // Check if there are differences between the current and new arrays
  const isDifferent = newValues.length !== arrayControl.length ||
    newValues.some((value, index) => value !== arrayControl.at(index).value);

  if (isDifferent) {
    arrayControl.clear();
    newValues.forEach(value => arrayControl.push(new FormControl(value, { nonNullable: true })));
  }
}
