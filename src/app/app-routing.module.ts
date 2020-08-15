import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';
import { GridOffsetComponent } from './grid-offset/grid-offset.component';
import { BackingPropsComponent } from './backing-props/backing-props.component';

const routes: Routes = [
  { path: 'grid-from-class', component: GridFromClassComponent },
  { path: 'grid-offset', component: GridOffsetComponent },
  { path: 'backing-props', component: BackingPropsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
