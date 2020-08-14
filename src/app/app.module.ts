import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputOutputComponent } from './input-output/input-output.component';
import { FormStyle } from '@angular/common';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';
import { GridOffsetComponent } from './grid-offset/grid-offset.component';
import { BackingPropsGeneratorComponent } from './backing-props-generator/backing-props-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    InputOutputComponent,
    GridFromClassComponent,
    GridOffsetComponent,
    BackingPropsGeneratorComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
