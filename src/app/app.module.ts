import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';
import { GridOffsetComponent } from './grid-offset/grid-offset.component';
import { BackingPropsComponent } from './backing-props/backing-props.component';
import { HomeComponent } from './home/home.component';
import { SwapAssignmentComponent } from './swap-assignment/swap-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    GridFromClassComponent,
    GridOffsetComponent,
    BackingPropsComponent,
    HomeComponent,
    SwapAssignmentComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
