import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rePasswordValidator(...controls: string[]): ValidatorFn {
  return (controlGroup: AbstractControl): ValidationErrors => {
    return { groupControlsValues: true };
  };
}
