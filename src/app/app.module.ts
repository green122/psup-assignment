import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableViewComponent } from './components/table-view/table-view.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FiltersListComponent } from './components/filters-list/filters-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    FilterPanelComponent,
    FiltersListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
