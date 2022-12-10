import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe-wizard',
  templateUrl: './recipe-wizard.component.html',
  styleUrls: ['./recipe-wizard.component.css'],
})
export class RecipeWizardComponent implements OnInit {
  @Input() title: string = 'Recipe Wizard';
  @Input() imageRequired: boolean = false;
  @Input() recipe: Recipe | null = null;
  @Output() image: File | null = null;
  @Output() finish = new EventEmitter();

  currentStep: number = 0;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(2500)]],
    ingredients: this.fb.array([], { validators: [Validators.required] }),
    steps: this.fb.array([], { validators: Validators.required }),
    prepTime: [1, [Validators.min(1)]],
    portions: [1, [Validators.min(1)]],
    tagsStr: [''],
    img: [''],
  });
  ingredientsInputsGroup = this.fb.group({
    name: ['', [Validators.required]],
    quantity: [''],
    units: [''],
  });
  cookingStepInput = this.fb.control('', { validators: [Validators.minLength(3)] });

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.form.controls.name.setValue(this.recipe?.name || '');
    this.form.controls.description.setValue(this.recipe?.description || '');
    this.form.controls.prepTime.setValue(this.recipe?.prepTime || 1);
    this.form.controls.portions.setValue(this.recipe?.portions || 1);
    this.form.controls.tagsStr.setValue(this.recipe?.tags.join(',') || '');
    if (this.imageRequired) {
      this.form.controls.img.setValidators(Validators.required);
    }
    this.recipe?.steps.forEach((step) => {
      const control = this.fb.control(step, { validators: [Validators.minLength(3)] });
      this.form.controls.steps.push(control);
      control.disable();
    });
    this.recipe?.ingredients.forEach((ing) => {
      const group = this.fb.group({
        name: [ing.name, [Validators.required]],
        quantity: [ing.quantity],
        units: [ing.units],
      });
      this.form.controls.ingredients.push(group as any);
      group.disable();
    });
  }

  submitHandler() {
    this.form.controls.steps.enable();
    this.form.controls.ingredients.enable();
    if (this.form.invalid || (this.imageRequired && !this.image)) {
      this.form.controls.steps.disable();
      this.form.controls.ingredients.disable();
      return;
    }
    const { name, description, ingredients, steps, prepTime, portions, tagsStr } = this.form.value;
    const tags = this.parseTags(tagsStr || '');
    const recipe = { name, description, ingredients, steps, prepTime, portions, tags };
    this.finish.emit({ recipe, image: this.image });
  }

  moveStepHandler(step: number) {
    if (step > -1 && step < 4) {
      this.currentStep = step;
    }
  }

  onFileInput(event: Event) {
    this.image = (event.target as HTMLInputElement).files?.item(0) || null;
  }

  private parseTags(tagsStr: string): string[] {
    // Split tags, trim each tag, replace new lines and tabs with a space, filter out empty elements, create a Set to filter out duplicates and return result as array
    return Array.from(
      new Set(
        tagsStr
          .split(',')
          .map((tag) => tag.trim().replace(/[\n\t]+/g, ' '))
          .filter((tag) => tag !== '')
      )
    );
  }

  removeFormArrayControl(controlArrayIndex: number, control: AbstractControl) {
    const parent = control.parent as FormArray;
    parent.removeAt(controlArrayIndex);
  }

  toggleControlEdit(control: AbstractControl) {
    if (control.disabled || control.invalid) {
      control.enable();
      return;
    }

    control.disable();
  }

  pushControlToArray(control: AbstractControl, formArray: FormArray) {
    if (control.invalid) {
      return;
    }

    if (control instanceof FormControl) {
      formArray.push(this.fb.control(control.value, { validators: control.validator }));
    }

    if (control instanceof FormGroup) {
      const group = this.fb.group({});
      for (let [name, ctrl] of Object.entries(control.controls)) {
        group.addControl(name, this.fb.control(ctrl.value, { validators: ctrl.validator }));
      }
      formArray.push(group);
    }

    formArray.controls.at(-1)?.disable();
    control.reset();
  }
}
