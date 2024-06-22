import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { repairLoadingSelector, repairErrorSelector, selectAllRepairs } from '@app/_store/_repair-store/repair.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRepairs, loadOrgRepairs } from '@app/_store/_repair-store/repair.actions';

@Component({
  selector: 'app-repair-results-page',
  templateUrl: './repair-results-page.component.html',
  styleUrls: ['./repair-results-page.component.css']
})
export class RepairResultsPageComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  repairError$ = this.store.select(repairErrorSelector);
  isLoading$ = this.store.select(repairLoadingSelector);
  repairs$ = this.store.select(selectAllRepairs);

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
            this.store.dispatch(loadOrgRepairs({ orgName }));
            break;
  
          default:
            this.store.dispatch(loadAllRepairs());
            break;
        }
      })
    )
      
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }


}
