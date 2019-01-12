import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ButtonModule,
    TableModule,
    DialogModule
  ]
})
export class PrimengComponentModule {
}
