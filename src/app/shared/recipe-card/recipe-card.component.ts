import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../interfaces';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipe: Recipe | null = null;

  constructor(private router: Router) {}

  cardClickHandler(e: Event) {
    if ((e.target as HTMLElement).closest('#owner-actions') || !this.recipe) {
      return;
    }
    this.router.navigate(['/recipes/' + this.recipe.slug]);
  }
}
