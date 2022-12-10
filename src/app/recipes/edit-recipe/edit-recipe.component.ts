import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent {
  recipe: Recipe;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.recipe = route.snapshot.data['recipe'];
  }

  onWizardFinish({ recipe, image }: { recipe: Recipe; image: File }) {
    this.api
      .patchRecipe(this.recipe.slug, recipe, image)
      .subscribe((response) => this.router.navigate([`/recipes/${response.data.recipe.slug}`]));
  }
}
