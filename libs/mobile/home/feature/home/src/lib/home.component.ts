import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {
  ChangeDetectionStrategy,
  NgModule,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeState } from './+state/home.state';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetListings } from './+state/home.actions';

@Component({
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Select(HomeState.listings) listings$!: Observable<any> | null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetListings());
  }

  handleRefresh(event: any) {}

  handleInfinite(event: any) {}

  trackListings(_index: number, listing: any): string {
    return listing.id;
  }
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxsModule.forFeature([HomeState]),
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  exports: [RouterModule],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}
