import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repair, Radio, Location } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { PdfService } from '@app/services/pdf/pdf.service';
import { locationErrorSelector, locationLoadingSelector, selectOneLocation } from '@app/_store/_location-store/location.selectors';
import { combineLatest, first } from 'rxjs';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit{

  oneRepair$ = this.store.select(selectOneRepair);
  repairError$ = this.store.select(repairErrorSelector);
  repairIsLoading$ = this.store.select(repairLoadingSelector);

  oneRadio$ = this.store.select(selectOneRadio);
  radioError$ = this.store.select(radioErrorSelector);
  radioIsLoading$ = this.store.select(radioLoadingSelector);

  oneLocation$ = this.store.select(selectOneLocation)
  locationError$ = this.store.select(locationErrorSelector)
  locationIsLoading$ = this.store.select(locationLoadingSelector);

  

  repair: Repair | undefined;
  radio: Radio | undefined;
  location: Location | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const repairID = params['id'];
        this.loadRepair(repairID)
      });
  };  

  loadRepair(repairID: string): void {
    this.store.dispatch(loadOneRepair({repairID: repairID}));
  };

  generatePDF() {
    combineLatest([this.oneRepair$, this.oneRadio$, this.oneLocation$]).pipe(
        first()
      ).subscribe(([repair, radio, location]) => {

      if (repair && radio && location) {
        const docDef = this.pdfService.formatRepairForPdf(repair, radio, location)
        this.pdfService.repairPDFGen(docDef)
      }

    })
  }
}

