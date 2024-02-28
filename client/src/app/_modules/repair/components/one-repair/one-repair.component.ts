import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repair, Radio } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { PdfService } from '@app/services/pdf/pdf.service';

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

  

  repair: Repair | undefined;
  radio: Radio | undefined;

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
  }

  loadRepair(repairID: string): void {
    this.store.dispatch(loadOneRepair({repairID: repairID}));
  };

  loadRadio(radioID: string): void {
    this.store.dispatch(loadOneRadio({radioID: radioID}));
  }

  generatePDF() {
    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        const docDef = this.pdfService.formatRepairForPdf(repair);
        this.pdfService.repairPDFGen(docDef);
      }

    })
  }
}

