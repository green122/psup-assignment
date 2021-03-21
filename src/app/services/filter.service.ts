import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type TTypes = 'string' | 'number';
type TTypesMap = {
  string: string;
  number: number;
};

type TValueType = string | number;
type TFilterFunction = (value: TValueType) => boolean;

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

interface TFilterRec {
  id: string;
  operateValue: TValueType;
  operator: string;
  fn: TFilterFunction;
}

export interface FilterViewRec {
  id: string;
  filterView: string;
}

interface TFilters {
  [field: string]: TFilterRec[];
}

const applyFilterFunctions = (
  value: TValueType,
  filtersArr: TFilterFunction[]
) => filtersArr.every((filterFn) => filterFn(value));

const serializeFilters = (filters: TFilters) => {};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filters$ = new BehaviorSubject<TFilters>({});

  constructor() {}

  getFilters<T>(field: T) {
    // TODO: invent smthg better
    const type = typeof field as TTypes;
    return Object.keys(filtersFunctions[type]);
  }

  getFilters$() {
    return this.filters$.asObservable();
  }

  getSerializedFilters$() {
    return this.getFilters$().pipe(
      map((filters) => {
        const filterViewRec = Object.entries(filters).reduce<FilterViewRec[]>(
          (acc, [key, filters]) => {
            const serializedStr: FilterViewRec[] = [];
            filters.forEach((filter) =>
              serializedStr.push({
                id: filter.id,
                filterView: `${key} ${filter.operator} ${filter.operateValue}`,
              })
            );
            return acc.concat(serializedStr);
          },
          []
        );
        return filterViewRec;
      })
    );
  }

  filterDataStream<T extends Array<Record<TValueType, unknown>>>(
    stream$: Observable<T>
  ) {
    return combineLatest([this.filters$, stream$]).pipe(
      map(([filters, data]) => {
        const keys = Object.keys(filters);
        const newData = data.filter((rec) =>
          keys.every((key) =>
            key in rec
              ? applyFilterFunctions(
                  rec[key] as TValueType,
                  filters[key].map((filter) => filter.fn)
                )
              : true
          )
        );
        return newData;
      })
    );
  }

  addFilter<T>({
    fieldValue,
    field,
    operator,
    value,
  }: {
    fieldValue: T;
    field: string;
    operator: string;
    value: string;
  }) {
    const type = typeof fieldValue as TTypes;
    const filters = this.filters$.getValue();

    const filterFunc = filtersFunctions[type][operator];
    const filterRec: TFilterRec = {
      id: Date.now().toString(),
      operator,
      operateValue: value,
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
