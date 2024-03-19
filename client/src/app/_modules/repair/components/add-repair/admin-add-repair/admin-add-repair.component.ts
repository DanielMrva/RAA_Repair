import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Organization, Radio, Repair, RepairFormFields, Location } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { addRepair } from '@app/_store/_repair-store/repair.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, combineLatest, BehaviorSubject, merge, withLatestFrom, first, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { orgErrorSelector, orgLoadingSelector, selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterService } from '@app/services/utilityServices/filter.service';

@Component({
  selector: 'app-admin-add-repair',
  templateUrl: './admin-add-repair.component.html',
  styleUrls: ['./admin-add-repair.component.css']
})
export class AdminAddRepairComponent implements OnInit {

  private orgNameSubject = new BehaviorSubject<string | null>(null);

  oneRadio$ = this.store.select(selectOneRadio);
  radioError$ = this.store.select(radioErrorSelector);
  radioIsLoading$ = this.store.select(radioLoadingSelector);

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);
  orgNameOptions: string[] = [];
  filteredOrgNames$!: Observable<string[]>;

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
  locationNameError$ = this.store.select(locationErrorSelector);
  locNameOptions: string[] = [];
  filteredLocNames$!: Observable<string[]>;

  adminRepairForm = new FormGroup({
    radioID: new FormControl<string>(''),
    radioMake: new FormControl<string>(''),
    radioSerial: new FormControl<string>(''),
    radioLocation: new FormControl<string>(''),
    dateReceived: new FormControl<Date>(new Date()),
    endUserPO: new FormControl<string>(''),
    raaPO: new FormControl<string>(''),
    dateSentTech: new FormControl<Date>(new Date()),
    dateRecTech: new FormControl<Date>(new Date()),
    dateSentEU: new FormControl<Date>(new Date()),
    techInvNum: new FormControl<string>(''),
    raaInvNum: new FormControl<string>(''),
    symptoms: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    testFreq: new FormControl<string>(''),
    incRxSens: new FormControl<string>(''),
    incFreqErr: new FormControl<string>(''),
    incMod: new FormControl<string>(''),
    incPowerOut: new FormControl<string>(''),
    outRxSens: new FormControl<string>(''),
    outFreqErr: new FormControl<string>(''),
    outMod: new FormControl<string>(''),
    outPowerOut: new FormControl<string>(''),
    accessories: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    workPerformed: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    repHours: new FormControl<number>(0),
    partsUsed: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    remarks: new FormControl<string>(''),
    orgName: new FormControl<string>(''),
  });

  isSubmitted = false;

  get symptomsArray(): FormArray {
    return this.adminRepairForm.get('symptoms') as FormArray;
  }

  get accessoriesArray(): FormArray {
    return this.adminRepairForm.get('accessories') as FormArray;
  }

  get workPerformedArray(): FormArray {
    return this.adminRepairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.adminRepairForm.get('partsUsed') as FormArray;
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private matDialog: MatDialogModule,
    private filterService: FilterService
  ) { }

  addSymptom() {
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  };

  addAccessory() {
    this.accessoriesArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
  };

  addWorkPerformed() {
    this.workPerformedArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removeWorkPerformed(index: number) {
    this.workPerformedArray.removeAt(index);
  };

  addPartsUsed() {
    this.partsUsedArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removePartsUsed(index: number) {
    this.partsUsedArray.removeAt(index);
  };

  fieldValidCheck(field: string) {
    if (
      this.adminRepairForm.get(`${field}`)?.invalid &&
      this.adminRepairForm.get(`${field}`)?.dirty ||
      this.adminRepairForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
      return true
    } else {
      return false
    }
  };

  submitRepair(submittedRepair: RepairFormFields): void {


    this.store.dispatch(addRepair({ submittedRepair: submittedRepair }))

  };

  openMismatchDialog(newLocation: string, oldLocation: string) {
    console.log(`mismatch between ${newLocation} and ${oldLocation}`)
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrgNames());
    this.store.dispatch(loadLocationNames());

    this.activatedRoute.paramMap.subscribe(params => {
      const radioID = params.get('radioID');
      if (radioID) {
        this.adminRepairForm.patchValue({ radioID: radioID });
        this.store.dispatch(loadOneRadio({ radioID }));
        this.oneRadio$.subscribe(radio => {
          if (radio) {
            this.adminRepairForm.patchValue({
              orgName: radio.orgName,
              radioSerial: radio.serialNumber,
              radioMake: radio.make
            });
            this.orgNameSubject.next(radio.orgName);
          }
        });
      }
    });


    

    this.filteredOrgNames$ = this.adminRepairForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      switchMap(value => 
        this.filterService.filterOrgs(value ?? '', this.orgNames$)
      )
    );

    this.filteredLocNames$ = combineLatest([
      this.adminRepairForm.controls.radioLocation.valueChanges.pipe(startWith('')),
      merge(
        this.orgNameSubject.asObservable(),
        this.adminRepairForm.controls.orgName.valueChanges
      ).pipe(startWith(null)),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this.filterService.filteredLocs(locName, orgName, locations))
    );

  };

  onSubmit() {

    of(this.adminRepairForm.value).pipe(
      withLatestFrom(this.oneRadio$),
      first(),
    ).subscribe(([formValue, oneRadio]) => {

      const formRadioLocation = formValue.radioLocation || '';
      const oneRadioLocationName = oneRadio?.locationName || '';

      if (formRadioLocation !== oneRadioLocationName) {
        this.openMismatchDialog(formRadioLocation, oneRadioLocationName);
      } else {
        const submittedRepair: RepairFormFields = {
          radioID: formValue.radioID ?? '',
          radioMake: formValue.radioMake ?? '',
          radioSerial: formValue.radioSerial ?? '',
          radioLocation: formValue.radioLocation ?? '',
          dateReceived: formValue.dateReceived ?? new Date(),
          endUserPO: formValue.endUserPO ?? '',
          raaPO: formValue.raaPO ?? '',
          dateSentTech: formValue.dateSentTech ?? new Date(),
          dateRecTech: formValue.dateRecTech ?? new Date(),
          dateSentEU: formValue.dateSentEU ?? new Date(),
          techInvNum: formValue.techInvNum ?? '',
          raaInvNum: this.adminRepairForm.value.raaInvNum ?? '',
          symptoms: Array.isArray(formValue.symptoms) ? formValue.symptoms : [''],
          testFreq: formValue.testFreq ?? '',
          incRxSens: formValue.incRxSens ?? '',
          incFreqErr: formValue.incFreqErr ?? '',
          incMod: formValue.incMod ?? '',
          incPowerOut: formValue.incPowerOut ?? '',
          outRxSens: formValue.outRxSens ?? '',
          outFreqErr: formValue.outFreqErr ?? '',
          outMod: formValue.outMod ?? '',
          outPowerOut: formValue.outPowerOut ?? '',
          accessories: Array.isArray(formValue.accessories) ? formValue.accessories : [''],
          workPerformed: Array.isArray(formValue.workPerformed) ? formValue.workPerformed : [''],
          repHours: formValue.repHours ?? 0,
          partsUsed: Array.isArray(formValue.partsUsed) ? formValue.partsUsed : [''],
          remarks: formValue.remarks ?? '',
        }

        this.submitRepair(submittedRepair)
      };
    });

    // if(this.adminRepairForm.value.radioLocation) {

    // }

    // const submittedRepair: RepairFormFields = {
    //   radioID: this.adminRepairForm.value.radioID ?? '',
    //   radioMake: this.adminRepairForm.value.radioMake ?? '',
    //   radioSerial: this.adminRepairForm.value.radioSerial ?? '',
    //   radioLocation: this.adminRepairForm.value.radioLocation ?? '',
    //   dateReceived: this.adminRepairForm.value.dateReceived ?? new Date(),
    //   endUserPO: this.adminRepairForm.value.endUserPO ?? '',
    //   raaPO: this.adminRepairForm.value.raaPO ?? '',
    //   dateSentTech: this.adminRepairForm.value.dateSentTech ?? new Date(),
    //   dateRecTech: this.adminRepairForm.value.dateRecTech ?? new Date(),
    //   dateSentEU: this.adminRepairForm.value.dateSentEU ?? new Date(),
    //   techInvNum: this.adminRepairForm.value.techInvNum ?? '',
    //   raaInvNum: this.adminRepairForm.value.raaInvNum ?? '',
    //   symptoms: Array.isArray(this.adminRepairForm.value.symptoms) ? this.adminRepairForm.value.symptoms : [''],
    //   testFreq: this.adminRepairForm.value.testFreq ?? '',
    //   incRxSens: this.adminRepairForm.value.incRxSens ?? '',
    //   incFreqErr: this.adminRepairForm.value.incFreqErr ?? '',
    //   incMod: this.adminRepairForm.value.incMod ?? '',
    //   incPowerOut: this.adminRepairForm.value.incPowerOut ?? '',
    //   outRxSens: this.adminRepairForm.value.outRxSens ?? '',
    //   outFreqErr: this.adminRepairForm.value.outFreqErr ?? '',
    //   outMod: this.adminRepairForm.value.outMod ?? '',
    //   outPowerOut: this.adminRepairForm.value.outPowerOut ?? '',
    //   accessories: Array.isArray(this.adminRepairForm.value.accessories) ? this.adminRepairForm.value.accessories : [''],
    //   workPerformed: Array.isArray(this.adminRepairForm.value.workPerformed) ? this.adminRepairForm.value.workPerformed : [''],
    //   repHours: this.adminRepairForm.value.repHours ?? 0,
    //   partsUsed: Array.isArray(this.adminRepairForm.value.partsUsed) ? this.adminRepairForm.value.partsUsed : [''],
    //   remarks: this.adminRepairForm.value.remarks ?? '',
    // }


    // this.submitRepair(submittedRepair)

  };

}
