import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { radioErrorSelector, selectAllRadios, manyRadiosLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRadios, loadLikeOrgRadios, loadLikeSerialRadio } from '@app/_store/_radio-store/radio.actions';

@Component({
  selector: 'app-radio-results-page',
  templateUrl: './radio-results-page.component.html',
  styleUrls: ['./radio-results-page.component.css']
})
export class RadioResultsPageComponent implements OnDestroy, OnInit {

  private subscriptions = new Subscription();

  radioError$ = this.store.select(radioErrorSelector);
  isLoading$ = this.store.select(manyRadiosLoadingSelector);
  radios$ = this.store.select(selectAllRadios);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];
        const serialNumber = params['serialNumber'];
        const model = params['model'];

        if (orgName) {
          this.store.dispatch(loadLikeOrgRadios({ orgName }));
        } else if (serialNumber || model) {
          this.store.dispatch(loadLikeSerialRadio({ serialNumber: serialNumber || '', model: model || '' }));
        } else {
          this.store.dispatch(loadAllRadios());
        }
      })
    );
  };


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
