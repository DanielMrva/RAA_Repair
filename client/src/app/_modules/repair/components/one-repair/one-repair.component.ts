import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repair, Radio, Location, PoTextAttributes, InvoiceTextAttributes } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';
import { PdfService } from '@app/services/pdf/pdf.service';
import { locationErrorSelector, locationLoadingSelector, selectOneLocation } from '@app/_store/_location-store/location.selectors';
import { Observable, Subscription, combineLatest, first } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-one-repair',
  templateUrl: './one-repair.component.html',
  styleUrls: ['./one-repair.component.css']
})
export class OneRepairComponent implements OnInit, OnDestroy{

  private subscriptions = new Subscription();

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
  }

  oneRepair$: Observable<Repair | null>;
  repairError$: Observable<any>;
  repairIsLoading$: Observable<boolean>;

  oneRadio$: Observable<Radio | null>;
  radioError$: Observable<any>;
  radioIsLoading$: Observable<boolean>;

  oneLocation$: Observable<Location | null>;
  locationError$: Observable<any>;
  locationIsLoading$: Observable<boolean>
  


  poText$: Observable<PoTextAttributes | undefined>;
  invoiceText$: Observable<InvoiceTextAttributes | undefined>;  

  repair: Repair | undefined;
  radio: Radio | undefined;
  location: Location | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private pdfService: PdfService
  ) {

    this.oneRepair$ = this.store.select(selectOneRepair);
    this.repairError$ = this.store.select(repairErrorSelector);
    this.repairIsLoading$ = this.store.select(repairLoadingSelector);
  
    this.oneRadio$ = this.store.select(selectOneRadio);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.radioIsLoading$ = this.store.select(radioLoadingSelector);
  
    this.oneLocation$ = this.store.select(selectOneLocation)
    this.locationError$ = this.store.select(locationErrorSelector)
    this.locationIsLoading$ = this.store.select(locationLoadingSelector);

    this.poText$ = combineLatest([this.oneRepair$, this.oneRadio$]).pipe(
      map(([repair, radio])=> repair && radio ? {
        make: repair.radioMake,
        model: radio.model,
        serialNumber: repair.radioSerial,
        accessories: repair.accessories,
        repairTag: repair.repairTag,
        orgName: radio.orgName,
        locationName: repair.radioLocation
      } : undefined) 
    );

    this.invoiceText$ = combineLatest([this.oneRepair$, this.oneRadio$]).pipe(
      map(([repair, radio]) => repair && radio ? {
        make: repair.radioMake,
        model: radio.model,
        serialNumber: repair.radioSerial,
        repairTag: repair.repairTag,
        workPerformed: repair.workPerformed
      }: undefined)
    );
  
  }

  ngOnInit(): void {

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        const repairID = params['id'];
        this.loadRepair(repairID);
        // this.generateConcatText();
      })
    );

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
  };
}

