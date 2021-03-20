import { Component, Input, OnInit } from '@angular/core';
import { AppTableRec, Names, TAppData } from '../config/config';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() table: TAppData | null = null;
  showColumns: Array<keyof AppTableRec> = [
    'productName',
    'productDescription',
    'price',
    'quantity',
    'size',
  ];
  columns = Names;
}
