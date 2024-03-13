import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Organization, Radio, Repair, RepairFormFields } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { addRepair } from '@app/_store/_repair-store/repair.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@app/graphql/schemas';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { loadOrgNames } from '@app/_store/_org-store/org.actions';
import { orgErrorSelector, orgLoadingSelector, selectOrgNames } from '@app/_store/_org-store/org.selectors';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-add-repair',
  templateUrl: './admin-add-repair.component.html',
  styleUrls: ['./admin-add-repair.component.css']
})
export class AdminAddRepairComponent implements OnInit {

  oneRadio$ = this.store.select(selectOneRadio);
  radioError$ = this.store.select(radioErrorSelector);
  radioIsLoading$ = this.store.select(radioLoadingSelector);
  radio!: Radio

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
    private matDialog: MatDialogModule
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

    console.log(submittedRepair.radioID)

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
      }
    });

    this.oneRadio$.subscribe(radio => {
      if (radio) {
        this.radio = radio
        this.adminRepairForm.patchValue({ orgName: radio.orgName });
        this.adminRepairForm.patchValue({radioSerial: radio.serialNumber});
        this.adminRepairForm.patchValue({radioMake: radio.make});
      }
    });

    this.filteredOrgNames$ = this.adminRepairForm.controls.orgName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrgs(value ?? ''))
    );

    this.filteredLocNames$ = combineLatest([
      this.adminRepairForm.controls.radioLocation.valueChanges.pipe(startWith('')),
      this.adminRepairForm.controls.orgName.valueChanges.pipe(startWith(this.adminRepairForm.controls.orgName.value)),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filteredLocs(locName, orgName, locations))
    );

  }

  private _filterOrgs(value: string): string[] {
    const filterValue = value.toLowerCase();

    let orgOptions: string[] = []

    this.orgNames$.subscribe((orgList: Organization[] | []) => {
      if (orgList.length > 0) {
        orgOptions = orgList.map(org => org.orgName)
      }
    })

    return orgOptions.filter(option => option.toLowerCase().includes(filterValue))

  }

  private _filteredLocs(locValue: string | null, radioOrgName: string | null, locations: Location[]): string[] {
    const filteredLocValue = (locValue || '').toLowerCase();
    const org = (radioOrgName || '').toLowerCase();

    let locOptions: string[] = [];
    locations.forEach((loc) => {
      if (loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === org) {
        locOptions.push(loc.locationName);
      }
    });

    return locOptions;
  };

  onSubmit() {

    const { orgName, ...submitData } = this.adminRepairForm.value;

    console.log(submitData.radioID)

    console.log(this.adminRepairForm.value);

    if(this.adminRepairForm.value.radioLocation !== this.radio.locationName) {
      this.openMismatchDialog(this.adminRepairForm.value.radioLocation ?? '', this.radio.locationName);
    }

    console.log(`radioID from this.radio._id: ${this.radio._id}`)

    const submittedRepair: RepairFormFields = {
      radioID: submitData.radioID ?? this.radio._id,
      radioMake: submitData.radioMake ?? this.radio.make,
      radioSerial: submitData.radioSerial ?? this.radio.serialNumber,
      radioLocation: submitData.radioLocation ?? '',
      dateReceived: submitData.dateReceived ?? new Date(),
      endUserPO: submitData.endUserPO ?? '',
      raaPO: submitData.raaPO ?? '',
      dateSentTech: submitData.dateSentTech ?? new Date(),
      dateRecTech: submitData.dateRecTech ?? new Date(),
      dateSentEU: submitData.dateSentEU ?? new Date(),
      techInvNum: submitData.techInvNum ?? '',
      raaInvNum: this.adminRepairForm.value.raaInvNum ?? '',
      symptoms: Array.isArray(submitData.symptoms) ? submitData.symptoms : [''],
      testFreq: submitData.testFreq ?? '',
      incRxSens: submitData.incRxSens ?? '',
      incFreqErr: submitData.incFreqErr ?? '',
      incMod: submitData.incMod ?? '',
      incPowerOut: submitData.incPowerOut ?? '',
      outRxSens: submitData.outRxSens ?? '',
      outFreqErr: submitData.outFreqErr ?? '',
      outMod: submitData.outMod ?? '',
      outPowerOut: submitData.outPowerOut ?? '',
      accessories: Array.isArray(submitData.accessories) ? submitData.accessories : [''],
      workPerformed: Array.isArray(submitData.workPerformed) ? submitData.workPerformed : [''],
      repHours: submitData.repHours ?? 0,
      partsUsed: Array.isArray(submitData.partsUsed) ? submitData.partsUsed : [''],
      remarks: submitData.remarks ?? '',
    }


    this.submitRepair(submittedRepair)

  };

}
