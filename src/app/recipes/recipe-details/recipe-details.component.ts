import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectApiStatus, selectFeatureRecipe, setRecipeQuery } from 'src/app/state';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe$ = this.store.select(selectFeatureRecipe);
  apiStatus$ = this.store.select(selectApiStatus);

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(setRecipeQuery({ slug: this.route.snapshot.params['id'] }));
  }

  deleteHandler() {
    this.router.navigate(['/recipes']);
  }
}
