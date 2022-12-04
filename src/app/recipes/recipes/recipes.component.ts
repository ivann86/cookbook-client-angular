import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.api.loadAllRecipes().subscribe({
    //   next: (value) => {
    //     this.recipes = value.data.items.slice(30, 54);
    //   },
    // });
    this.recipes = this.route.snapshot.data['recipes'].data.items.slice(60);
  }
}
