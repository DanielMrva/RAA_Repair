import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Radio, statusType } from '@app/graphql/schemas/typeInterfaces';
import { AppState} from '@app/_store/app.state';
import { RadioState } from '@app/_store/_radio-store/radio.reducers';
import { Store } from '@ngrx/store';
import { loadOneRadio, loadSerialRadio} from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioLoadingSelector, radioErrorSelector } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';
import { selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';
import { ACCESS_LEVEL_ADMIN } from '@app/utils/constants';

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
  userAccessLevel$

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { 
      this.isLoading$ = this.store.select(radioLoadingSelector);
      this.radioError$ = this.store.select(radioErrorSelector);
      this.oneRadio$ = this.store.select(selectOneRadio);
      this.userAccessLevel$ = this.store.select(selectAccessLevel)
    }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const {id, serialNumber, model} = params;

        if (id) {
          this.loadRadio(id);
        } else if (serialNumber && model) {
          this.loadSNRadio(serialNumber, model)
        }

      })
    )
  };

  loadRadio(radioID: string): void {
    
    this.store.dispatch(loadOneRadio({radioID}));

  };

  loadSNRadio(serialNumber: string, model: string): void {
    this.store.dispatch(loadSerialRadio({serialNumber, model}));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };


}
