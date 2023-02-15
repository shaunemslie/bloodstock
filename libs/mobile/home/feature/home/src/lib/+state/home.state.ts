import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { mergeAll, switchMap, take, tap, map } from 'rxjs/operators';
import { GetListings, LoadListings } from './home.actions';

export interface HomeStateModel {
  listings: any;
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    listings: [],
  },
})
@Injectable()
export class HomeState {
  @Selector()
  static listings(state: HomeStateModel) {
    return state.listings;
  }

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  @Action(GetListings)
  getListings(ctx: StateContext<HomeStateModel>) {
    return this.auth.authState.pipe(
      switchMap((user) =>
        this.firestore
          .collection('following')
          .doc(user?.uid)
          .collection('userFollows')
          .snapshotChanges()
          .pipe(
            mergeAll(),
            map((follows) => follows.payload.doc.id),
            switchMap((loftId) =>
              this.firestore
                .collection('lofts')
                .doc(loftId)
                .collection('listings')
                .valueChanges()
            ),
            tap((listings) => ctx.patchState({ listings }))
          )
      )
    );
  }

  @Action(LoadListings)
  loadListings(ctx: StateContext<HomeStateModel>) {}
}
