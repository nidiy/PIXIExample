import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {PrimengComponentModule} from './PrimengComponentModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrimengComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
