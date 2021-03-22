# Product Sup test assignment

## Install

go to the project directory
run `npm i`
make sure that angular CLI utilite is installed.
If not - run `npm install -g @angular/cli`

Run `ng serve` inside the project directory

## Notes

The core of the logic is inside `FilterService`. We have filters functions map based on the type of the field, that we infer in a runtime.
Applied filters are stored in associative array structure where the keys is the name of the fields of the table and values are the arrays of the filter functions applied on this field. It provides us pretty convenient process of applying filters on the each row of the table. But as a light misbenefit - not very convenient process of the removing of the filter.

For plugging in filter service you should call `filterDataStream` method and pass the data stream inside. It would return as a result a new stream with the applied filters. You may add a new filter by calling `addFilter` method and immediately you data stream will be updated;

### Components structure

Nothing special here. `app` component consists of `filter-panel` and `table-view` components. `filter-panel` has a form for creating a new filter and is injected with a filter service. `table-view` gets a table data right from `app` component.

### Tests

A few test were added for the main filter service functionality

### Configuration and flexibility.

There is a config file that provides a configuration of the API response with a types and fields renaming. As a second option we may get rid of the types and works with the abstract data, but as a result we'd have some ugly names of the table like image_additional. So I suppose that it'd be better to have more detailed description. We may have a lot of type definitions and switch between them by assigning
`TApiData` and `TAppData`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
