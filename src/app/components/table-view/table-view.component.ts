import { Component, Input, OnInit } from '@angular/core';
import { AppTableRec, Names, showColumns, TAppData } from '../../config/config';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() table: TAppData | null = null;
  showColumns = showColumns;
  columns = Names;
}
