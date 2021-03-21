import { FilterViewRec } from '../types/common';

export type TValueType = string | number;
export type TFilterFunction = (value: TValueType) => boolean;

export interface TFilterRec {
  id: string;
  operateValue: TValueType;
  operator: string;
  fn: TFilterFunction;
}

export interface TFilters {
  [field: string]: TFilterRec[];
}

export const applyFilterFunctions = (
  value: TValueType,
  filtersArr: TFilterFunction[]
) => filtersArr.every((filterFn) => filterFn(value));

export const serializeFilters = (filters: TFilters) => {
  const filterViewRec = Object.entries(filters).reduce<FilterViewRec[]>(
    (acc, [field, filters]) => {
      const serialized: FilterViewRec[] = [];
      filters.forEach((filter) =>
        serialized.push({
          id: filter.id,
          filterView: `${field} ${filter.operator} ${filter.operateValue}`,
        })
      );
      return acc.concat(serialized);
    },
    []
  );
  return filterViewRec;
};

export const applyFiltersToData = <T extends Record<string, unknown>[]>(
  filters: TFilters,
  data: T
): T => {
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
  return newData as T;
};
