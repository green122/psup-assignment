import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppTableRec, Names, showColumns, TAppData } from '../../config/config';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  dataSource = new MatTableDataSource<AppTableRec>([]);

  @Input() set table(value: TAppData | null) {
    if (!value) return;
    this.dataSource = new MatTableDataSource<AppTableRec>(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  showColumns = showColumns;
  columns = Names;
}
