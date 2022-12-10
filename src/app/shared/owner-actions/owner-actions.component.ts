import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Recipe } from '../interfaces';

@Component({
  selector: 'app-owner-actions',
  templateUrl: './owner-actions.component.html',
  styleUrls: ['./owner-actions.component.css'],
})
export class OwnerActionsComponent {
  @Input() recipe: Recipe | null = null;
  @Input() size: 'tiny' | 'normal' = 'normal';
  @Input() labels: boolean = true;

  @Output() delAction = new EventEmitter();

  constructor(private api: ApiService, private router: Router) {}

  editHandler() {
    if (!this.recipe) {
      return;
    }
    this.router.navigate(['/edit-recipe/' + this.recipe.slug]);
  }

  removeHandler() {
    if (!this.recipe?.isOwner) {
      return;
    }
    if (confirm(`Are you sure you want to delete recipe "${this.recipe.name}"?`)) {
      this.api.deleteRecipe(this.recipe.slug).subscribe(() => {});
      this.delAction.emit();
    }
  }
}
