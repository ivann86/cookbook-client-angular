import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  currentStep: number = 0;
  countries$: Observable<string[]> = new Observable();

  ingredientsInputsGroup = this.fb.group({
    name: ['', [Validators.required]],
    quantity: [''],
    units: [''],
  });
  cookingStepInput = this.fb.control('', { validators: [Validators.minLength(3)] });
  image: File | null = null;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(2500)]],
    ingredients: this.fb.array([], { validators: [Validators.required] }),
    steps: this.fb.array([], { validators: Validators.required }),
    prepTime: [1, [Validators.min(1)]],
    portions: [1, [Validators.min(1)]],
    country: [''],
    tagsStr: [''],
    img: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.countries$ = this.api.getCountriesList();
  }

  moveStepHandler(step: number) {
    if (step > -1 && step < 4) {
      this.currentStep = step;
    }
  }

  submitHandler() {
    this.form.controls.steps.enable();
    this.form.controls.ingredients.enable();
    if (this.form.invalid || !this.image) {
      this.form.controls.steps.disable();
      this.form.controls.ingredients.disable();
      return;
    }
    const { name, description, ingredients, steps, prepTime, portions, country, tagsStr } = this.form.value;
    const tags = this.parseTags(tagsStr || '');
    const recipe = { name, description, ingredients, steps, prepTime, portions, country, tags };
    this.api
      .addRecipe(recipe as Recipe, this.image)
      .subscribe((response) => this.router.navigate([`/recipes/${response.data.recipe.slug}`]));
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
