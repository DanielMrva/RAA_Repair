import { Component,  OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { repairLoadingSelector, repairErrorSelector, selectAllRepairs } from '@app/_store/_repair-store/repair.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadAllRepairs, loadOrgRepairs, loadRepairByTag } from '@app/_store/_repair-store/repair.actions';

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
        const startTag = params['startTag'] ? parseInt(params['startTag'], 10) : undefined;
        const endTag = params['endTag'] ? parseInt(params['endTag'], 10) : undefined;

        if (orgName) {
          this.store.dispatch(loadOrgRepairs({ orgName }));
        } else if (startTag !== undefined) {
          this.store.dispatch(loadRepairByTag({ startTag, endTag }));
        } else {
          this.store.dispatch(loadAllRepairs());
        }
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }


}
