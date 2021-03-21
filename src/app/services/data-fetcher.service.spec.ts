import { TestBed } from '@angular/core/testing';
import { TApiData, TAppData } from '../config/config';

import { DataFetcherService } from './data-fetcher.service';

describe('DataFetcherService', () => {
  let service: DataFetcherService<TApiData, TAppData>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
