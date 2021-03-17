import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppTableRec, Names } from '../api/types';
import { DataFetcherService } from '../services/data-fetcher.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  table: AppTableRec[] = [];
  showColumns: Array<keyof AppTableRec> = [
    'productName',
    'productDescription',
    'price',
    'quantity',
    'size',
  ];
  columns = Names;

  constructor(private fetcher: DataFetcherService) {}

  ngOnInit() {
    this.fetcher.getData().subscribe((data) => (this.table = data));
  }
}
