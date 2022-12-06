import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  currentStep: number = 0;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(2500)]],
    ingredients: new FormArray([
      this.fb.group({
        name: [''],
        quantity: [''],
        units: [''],
      }),
    ]),
    cookingSteps: new FormArray([this.fb.control('', { validators: [Validators.minLength(3)] })]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  moveStepHandler(step: number) {
    if (step > -1 && step < 4) {
      this.currentStep = step;
    }
  }

  submitHandler() {
    console.log(this.form.value);
  }

  removeFormArrayControl(controlArrayIndex: number, control: AbstractControl) {
    (control.parent as FormArray).removeAt(controlArrayIndex);
  }

  toggleControlEdit(control: AbstractControl) {
    if (control.pristine || control.disabled || control.invalid) {
      control.enable();
      return;
    }

    control.disable();

    // Add a new control if this was the last one
    if ((control.parent as FormArray).controls.at(-1) === control) {
      if (control instanceof FormControl) {
        (control.parent as FormArray).push(this.fb.control('', { validators: control.validator }));
      }
      if (control instanceof FormGroup) {
        const group = this.fb.group({});
        for (let [name, ctrl] of Object.entries(control.controls)) {
          group.addControl(name, this.fb.control('', { validators: ctrl.validator }));
        }
        (control.parent as FormArray).push(group);
      }
    }
  }
}
