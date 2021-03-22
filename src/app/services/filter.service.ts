import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TTypes } from '../types/common';
import { genRandomID } from '../utils/common';
import {
  applyFiltersToData,
  serializeFilters,
  TFilterFunction,
  TFilterRec,
  TFilters,
  TValueType,
} from './utils';

type TTypesMap = {
  string: string;
  number: number;
};

type TOperateFilterFunction<T extends unknown> = (
  operateValue: T
) => TFilterFunction;

type FiltersByType<T extends TTypes> = Record<
  T,
  Record<string, TOperateFilterFunction<TTypesMap[T]>>
>;

const filtersFunctions: FiltersByType<TTypes> = {
  number: {
    'less than': (operateValue) => (val) => val < operateValue,
    'less than or equal to': (operateValue) => (val) => val <= operateValue,
    'more than': (operateValue) => (val) => val > operateValue,
    'more than or equal to': (operateValue) => (val) => val >= operateValue,
    equals: (operateValue) => (val) => val === operateValue,
  },
  string: {
    contains: (operateValue) => (value) =>
      (value as string).includes(operateValue as string),
    'does not contain': (operateValue) => (value) =>
      !(operateValue as string).includes(value as string),
  },
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filters$ = new BehaviorSubject<TFilters>({});

  constructor() {}

  getFilters(type: TTypes) {
    return Object.keys(filtersFunctions[type]);
  }

  getFilters$() {
    return this.filters$.asObservable();
  }

  getSerializedFilters$() {
    return this.getFilters$().pipe(map(serializeFilters));
  }

  removeFilterById(id: string) {
    const value = this.filters$.getValue();

    Object.keys(value).forEach((key) => {
      value[key] = value[key].filter((filterRec) => filterRec.id !== id);
    });

    this.filters$.next(value);
  }

  // TODO: make more type safe
  filterDataStream<T extends Array<Record<TValueType, unknown>>>(
    stream$: Observable<T>
  ) {
    return combineLatest([this.filters$, stream$]).pipe(
      map(([filters, data]) => applyFiltersToData(filters, data))
    );
  }

  addFilter({
    id = genRandomID(),
    type,
    field,
    operator,
    value,
  }: {
    id?: string;
    type: TTypes;
    field: string;
    operator: string;
    value: string;
  }) {
    const castedValue = type === 'number' ? Number(value) : value;

    const filters = this.filters$.getValue();

    const filterFunc = filtersFunctions[type][operator];
    const filterRec: TFilterRec = {
      id,
      operator,
      operateValue: castedValue,
      fn: filterFunc(value),
    };

    if (filters[field]) {
      filters[field].push(filterRec);
    } else {
      filters[field] = [filterRec];
    }

    this.filters$.next(filters);
  }
}
