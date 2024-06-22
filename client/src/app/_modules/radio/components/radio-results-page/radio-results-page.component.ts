import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { radioLoadingSelector, radioErrorSelector, selectAllRadios } from '@app/_store/_radio-store/radio.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRadios, loadLikeOrgRadios } from '@app/_store/_radio-store/radio.actions';

@Component({
  selector: 'app-radio-results-page',
  templateUrl: './radio-results-page.component.html',
  styleUrls: ['./radio-results-page.component.css']
})
export class RadioResultsPageComponent implements OnDestroy, OnInit {
  
  private subscriptions = new Subscription();

  radioError$ = this.store.select(radioErrorSelector);
  isLoading$ = this.store.select(radioLoadingSelector);
  radios$ = this.store.select(selectAllRadios);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const orgName = params['orgName'];

        const condition = orgName ? 'orgName' : 'default';

        switch(condition) {
          case 'orgName':
            this.store.dispatch(loadLikeOrgRadios({ orgName }));
            break;
  
          default:
            this.store.dispatch(loadAllRadios());
            break;
        }
      })
    )
      
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }


}
