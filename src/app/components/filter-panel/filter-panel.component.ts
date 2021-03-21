import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { showColumns, TAppData, TField } from 'src/app/config/config';
import { FilterService } from 'src/app/services/filter.service';
import { FilterViewRec } from 'src/app/types/common';
import { getTypeOfField } from 'src/app/utils/common';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
  @Input() table: TAppData | null = null;

  filterForm = new FormGroup({
    field: new FormControl(''),
    operator: new FormControl(''),
    value: new FormControl(''),
  });
  showColumns = showColumns;

  selectedOperator: TField | null = null;

  operators: string[] = [];
  value = '';

  valueFormControl = new FormControl('', [Validators.required]);

  filtersList: Observable<FilterViewRec[]>;

  constructor(private filterService: FilterService) {
    this.filtersList = filterService.getSerializedFilters$();
  }

  ngOnInit(): void {}

  onSelectField() {
    const selectedField = this.filterForm.controls.field.value as TField;
    if (!this.table || !selectedField) return;

    this.operators = this.filterService.getFilters(
      this.table[0][selectedField]
    );
  }

  isFormFieldSelected(name: string) {
    return Boolean(this.filterForm.controls[name]?.value);
  }

  onSubmit() {
    const { value, operator, field } = this.filterForm.value;
    if (!this.table) return;

    this.filterService.addFilter({
      type: getTypeOfField(this.table, field),
      value,
      operator,
      field,
    });

    this.filterForm.reset();
    this.filterForm.controls.field.setErrors(null);
    this.operators = [];
  }

  removeFilter(id: string) {
    this.filterService.removeFilterById(id);
  }
}
