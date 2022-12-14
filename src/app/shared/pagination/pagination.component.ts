import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() count = 0;
  @Input() selected: number = 1;
  @Input() btnCount: number = 7;
  @Output() change = new EventEmitter();

  pages: number[] = [];

  constructor() {}

  ngOnChanges(): void {
    let calculatedCount = Math.ceil(this.count);
    let calculatedBtnCount = this.btnCount;
    if (calculatedBtnCount > calculatedCount) {
      calculatedBtnCount = calculatedCount;
    }

    let firstBtn = this.selected - Math.floor(calculatedBtnCount / 2);
    let lastBtn = firstBtn + calculatedBtnCount - 1;
    if (firstBtn < 1) {
      firstBtn = 1;
      lastBtn = firstBtn + calculatedBtnCount - 1;
    }
    if (lastBtn > calculatedCount) {
      lastBtn = calculatedCount;
      firstBtn = lastBtn - calculatedBtnCount + 1;
    }

    this.pages = Array.from({ length: lastBtn - firstBtn + 1 }, (_, i) => i + firstBtn);
  }
}
