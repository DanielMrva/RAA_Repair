import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '@app/services/repairs/repair.service';
import { Repair } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { PdfService } from '@app/services/pdf/pdf.service';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit{

  oneRepair$ = this.store.select(selectOneRepair);
  repairError$ = this.store.select(repairErrorSelector);
  isLoading$ = this.store.select(repairLoadingSelector);

  repair: Repair | undefined;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairService,
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

  generatePDF() {
    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        const docDef = this.pdfService.formatRepairForPdf(repair);
        this.pdfService.repairPDFGen(docDef);
      }

    })
  }
}

