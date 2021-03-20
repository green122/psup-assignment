import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { serializer, TApiData, TAppData } from './config/config';
import { DataFetcherService } from './services/data-fetcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  table: Observable<TAppData> | null = null;

  constructor(private fetcher: DataFetcherService<TApiData, TAppData>) {}

  ngOnInit() {
    this.table = this.fetcher.getData(serializer);
  }
}
