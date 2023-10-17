import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radios/radio.service'
import { Radio, statusType } from '@app/graphql/schemas/typeInterfaces';
import { AppState} from '@app/_store/app.state';
import { RadioState } from '@app/_store/_radio-store/radio.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RadioActions from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioStatusSelector, radioErrorSelector } from '@app/_store/_radio-store/radio.selectors';

@Component({
  selector: 'app-one-radio',
  templateUrl: './one-radio.component.html',
  styleUrls: ['./one-radio.component.css']
})
export class OneRadioComponent implements OnInit{

  public radioStatus$ = this.store.select(radioStatusSelector);
  public radioError$ = this.store.select(radioErrorSelector);
  public oneRadio$ = this.store.select(selectOneRadio);

  // radioStatus$: Observable<statusType>;
  // radioError$: Observable<string | null>;
  // oneRadio$: Observable<Radio | null>;

  radio: Radio | undefined;

  constructor(
    private route: ActivatedRoute,
    private radioService: RadioService,
    private store: Store<AppState>
  ) {
    // this.radioStatus$ = this.store.select(radioStatusSelector);
    // this.radioError$ = this.store.select(radioErrorSelector);
    // this.oneRadio$ = this.store.select(selectOneRadio);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const radioId = params['id'];
      console.log(radioId)
      this.store.dispatch(RadioActions.loadOneRadio({radioId}));
      // this.loadRadio(radioId)
    });
  }

  loadRadio(radioId: string): void {
    
    this.store.dispatch(RadioActions.loadOneRadio({radioId}));

    // this.radioService.querySingleRadio(radioId).valueChanges
    // .subscribe(({ data }) => {
    //   this.radio = data.radio;
    // });
  }


}
