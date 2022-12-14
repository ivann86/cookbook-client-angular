import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces';
import { editRecipe, selectApiStatus, selectRecipe, setRecipeQuery } from 'src/app/state';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  slug: string = '';
  apiStatus$ = this.store.select(selectApiStatus);
  recipe$ = this.store.select(selectRecipe).pipe(
    tap((recipe: Recipe) => {
      this.slug = recipe?.slug;
    })
  );

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(setRecipeQuery({ slug: this.route.snapshot.params['slug'] }));
  }

  onWizardFinish({ recipe, image }: { recipe: Recipe; image: File }) {
    this.store.dispatch(editRecipe({ slug: this.slug, recipe, image }));
  }
}
