import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import table from '../../mock/table_data.json';
import { ApiTableRec, serializer } from '../api/types';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService {
  constructor() {}

  public getData() {
    return of<Record<string, ApiTableRec>>(table).pipe(
      delay(500),
      map((data) => Object.values(data).map(serializer))
    );
  }
}
