import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Radio, statusType } from '@app/graphql/schemas/typeInterfaces';
import { AppState} from '@app/_store/app.state';
import { RadioState } from '@app/_store/_radio-store/radio.reducers';
import { Store } from '@ngrx/store';
import { loadOneRadio} from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioLoadingSelector, radioErrorSelector } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-one-radio',
  templateUrl: './one-radio.component.html',
  styleUrls: ['./one-radio.component.css']
})
export class OneRadioComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();



  isLoading$
  radioError$
  oneRadio$

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { 
      this.isLoading$ = this.store.select(radioLoadingSelector);
      this.radioError$ = this.store.select(radioErrorSelector);
      this.oneRadio$ = this.store.select(selectOneRadio);
    }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const radioID = params['id'];

        this.loadRadio(radioID);

      })
    )
  };

  loadRadio(radioID: string): void {
    
    this.store.dispatch(loadOneRadio({radioID}));

  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };


}
