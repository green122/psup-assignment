import { Component } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { serializer, TApiData, TAppData } from './config/config';
import { DataFetcherService } from './services/data-fetcher.service';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  table$: Observable<TAppData> | null = null;

  constructor(
    private fetcher: DataFetcherService<TApiData, TAppData>,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.table$ = this.filterService.filterDataStream(
      this.fetcher.getData(serializer)
    );
  }
}
