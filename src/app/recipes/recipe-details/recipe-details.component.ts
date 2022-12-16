import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectApiStatus, selectRecipe, setRecipeQuery } from 'src/app/state';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  apiStatus$ = this.store.select(selectApiStatus);
  recipe$ = this.store.select(selectRecipe).pipe(tap((recipe) => this.title.setTitle('Cookbook - ' + recipe.name)));

  constructor(private store: Store, private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.store.dispatch(setRecipeQuery({ slug: this.route.snapshot.params['slug'] }));
  }
}
