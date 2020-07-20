import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';


const routes: Routes = [
  { path: 'grid-from-class', component: GridFromClassComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
