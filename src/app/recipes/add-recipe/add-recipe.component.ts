import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}

  onWizardFinish({ recipe, image }: { recipe: Recipe; image: File }) {
    this.api
      .addRecipe(recipe, image)
      .subscribe((response) => this.router.navigate([`/recipes/${response.data.recipe.slug}`]));
  }
}
