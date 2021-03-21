import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterViewRec } from 'src/app/types/common';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss'],
})
export class FiltersListComponent {
  @Input() filters: FilterViewRec[] | null = [];
  @Output() removeFilter = new EventEmitter<string>();

  constructor() {}

  onRemoveFilter(id: string) {
    this.removeFilter.emit(id);
  }
}
