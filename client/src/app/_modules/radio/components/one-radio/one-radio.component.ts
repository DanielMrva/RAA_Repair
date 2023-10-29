import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radios/radio.service'
import { Radio, statusType } from '@app/graphql/schemas/typeInterfaces';
import { AppState} from '@app/_store/app.state';
import { RadioState } from '@app/_store/_radio-store/radio.reducers';
import { Store } from '@ngrx/store';
import { loadOneRadio} from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioLoadingSelector, radioErrorSelector } from '@app/_store/_radio-store/radio.selectors';

@Component({
  selector: 'app-one-radio',
  templateUrl: './one-radio.component.html',
  styleUrls: ['./one-radio.component.css']
})
export class OneRadioComponent implements OnInit{

  isLoading$ = this.store.select(radioLoadingSelector);
  radioError$ = this.store.select(radioErrorSelector);
  oneRadio$ = this.store.select(selectOneRadio);


  radio: Radio | undefined;

  constructor(
    private route: ActivatedRoute,
    private radioService: RadioService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const radioId = params['id'];
      console.log(radioId)
      this.store.dispatch(loadOneRadio({radioId}));
      // this.loadRadio(radioId)
    });
  }

  loadRadio(radioId: string): void {
    
    this.store.dispatch(loadOneRadio({radioId}));

    // this.radioService.querySingleRadio(radioId).valueChanges
    // .subscribe(({ data }) => {
    //   this.radio = data.radio;
    // });
  }


}
