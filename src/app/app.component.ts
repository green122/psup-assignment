import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTableRec, Names } from './api/types';
import { DataFetcherService } from './services/data-fetcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
