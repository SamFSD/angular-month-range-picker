import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { TimeselectorComponent } from './timeselector/timeselector.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, OverlayPanelModule, CalendarModule ],
  declarations: [ AppComponent, HelloComponent, TimeselectorComponent, MonthpickerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
