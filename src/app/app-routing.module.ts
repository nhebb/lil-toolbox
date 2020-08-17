import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridFromClassComponent } from './grid-from-class/grid-from-class.component';
import { GridOffsetComponent } from './grid-offset/grid-offset.component';
import { BackingPropsComponent } from './backing-props/backing-props.component';
import { SwapAssignmentComponent} from './swap-assignment/swap-assignment.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'grid-from-class', component: GridFromClassComponent },
  { path: 'grid-offset', component: GridOffsetComponent },
  { path: 'backing-props', component: BackingPropsComponent },
  { path: 'swap-assignment', component: SwapAssignmentComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
