import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { TTypes } from '../types/common';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should add filters and emit filtered data', () => {
    const filter = {
      type: 'number' as TTypes,
      field: 'fakeField',
      operator: 'more than',
      value: '5',
    };

    const fakeData = [
      { fakeField: 6, fakeField2: 'just comment' },
      { fakeField: 4, fakeField2: 'just comment2' },
    ];

    service
      .filterDataStream(of(fakeData))
      .pipe(skip(1))
      .subscribe((data) => expect(data).toEqual([fakeData[0]]));

    service.addFilter(filter);
  });

  it('should remove filters by Id', () => {
    const filter = {
      id: '007',
      type: 'number' as TTypes,
      field: 'fakeField',
      operator: 'more than',
      value: '5',
    };

    service
      .getFilters$()
      .pipe(skip(2))
      .subscribe((filters) => expect(filters).toEqual({ fakeField: [] }));

    service.addFilter(filter);
    service.removeFilterById('007');
  });
});
