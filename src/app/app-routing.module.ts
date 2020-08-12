import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';
import { GridOffsetComponent } from './grid-offset/grid-offset.component';

const routes: Routes = [
  { path: 'grid-from-class', component: GridFromClassComponent },
  { path: 'grid-offset', component: GridOffsetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
