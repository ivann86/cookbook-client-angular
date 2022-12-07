import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rePasswordValidator(passwordControl: string, rePasswordControl: string): ValidatorFn {
  return (controlGroup: AbstractControl): ValidationErrors | null => {
    const password = controlGroup.get(passwordControl)?.value;
    const rePassword = controlGroup.get(rePasswordControl)?.value;
    if (password === rePassword) {
      return null;
    }
    return { groupControlsValues: true };
  };
}
