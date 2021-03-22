import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { showColumns, TAppData, TField } from 'src/app/config/config';
import { FilterService } from 'src/app/services/filter.service';
import { FilterViewRec, TTypes } from 'src/app/types/common';
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

  valueFormControl = new FormControl('');

  filtersList: Observable<FilterViewRec[]>;

  constructor(private filterService: FilterService) {
    this.filtersList = filterService.getSerializedFilters$();
  }

  ngOnInit(): void {}

  getSelectedType() {
    const field = this.filterForm.controls.field.value as TField;
    return getTypeOfField(this.table, field);
  }

  onSelectField() {
    const type = this.getSelectedType();
    if (!type) return;

    this.operators = this.filterService.getFilters(type);
  }

  onSelectOperator() {
    const valueValidators = [Validators.required];
    const selectedType = this.getSelectedType();

    if (selectedType === 'number')
      valueValidators.push(Validators.pattern(/^[+-]?(?:\d+\.?\d*|\d*\.\d+)$/));

    this.filterForm.controls.value.setValidators(valueValidators);
  }

  isFormFieldSelected(name: string) {
    return Boolean(this.filterForm.controls[name]?.value);
  }

  isValueControlValid() {
    const control = this.filterForm.controls.value;

    return control.errors && control.touched && control.dirty;
  }

  getErrorMessage() {
    const error = this.filterForm.controls.value.errors?.pattern;
    if (!error) return;

    return 'Entered value is not a number';
  }

  onSubmit() {
    const { value, operator, field } = this.filterForm.value;
    if (!this.table) return;

    this.filterService.addFilter({
      type: getTypeOfField(this.table, field) as TTypes,
      value,
      operator,
      field,
    });

    this.filterForm.reset();
    this.filterForm.clearValidators();
    this.filterForm.controls.field.setErrors(null);
    this.operators = [];
  }

  removeFilter(id: string) {
    this.filterService.removeFilterById(id);
  }
}
