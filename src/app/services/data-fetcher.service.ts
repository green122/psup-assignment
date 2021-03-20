import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import table from '../../mock/table_data.json';
import { AbstractApiType, AbstractAppType } from '../api/types';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService<
  ApiType extends AbstractApiType,
  AppType extends AbstractAppType
> {
  constructor() {}

  public getData(serializer: (data: ApiType) => AppType) {
    return of<ApiType>(table).pipe(delay(500), map(serializer));
  }
}
