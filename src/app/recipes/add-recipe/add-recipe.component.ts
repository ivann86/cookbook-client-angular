import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from 'src/app/shared/interfaces';
import { addRecipe } from 'src/app/state';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onWizardFinish({ recipe, image }: { recipe: Recipe; image: File }) {
    this.store.dispatch(addRecipe({ recipe, image }));
  }
}
