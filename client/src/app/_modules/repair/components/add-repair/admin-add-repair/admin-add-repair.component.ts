import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { Repair, RepairFormFields } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { addRepair } from '@app/_store/_repair-store/repair.actions';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { selectOrgName } from '@app/_store/_auth-store/auth.selectors';
import { loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators'
import { Location } from '@app/graphql/schemas';

@Component({
  selector: 'app-admin-add-repair',
  templateUrl: './admin-add-repair.component.html',
  styleUrls: ['./admin-add-repair.component.css']
})
export class AdminAddRepairComponent implements OnInit {

  orgName$ = this.store.select(selectOrgName);

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
    symptoms: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    testFreq: new FormControl<string>(''),
    incRxSens: new FormControl<string>(''),
    incFreqErr: new FormControl<string>(''),
    incMod: new FormControl<string>(''),
    incPowerOut: new FormControl<string>(''),
    outRxSens: new FormControl<string>(''),
    outFreqErr: new FormControl<string>(''),
    outMod: new FormControl<string>(''),
    outPowerOut: new FormControl<string>(''),
    accessories: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    workPerformed: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    repHours: new FormControl<number>(0),
    partsUsed: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    remarks: new FormControl<string>(''),
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
    private store: Store<AppState>
  ) {  }

  addSymptom() {
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  }

  addAccessory() {
    this.accessoriesArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
  }

  addWorkPerformed() {
    this.workPerformedArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removeWorkPerformed(index: number) {
    this.workPerformedArray.removeAt(index);
  }

  addPartsUsed() {
    this.partsUsedArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removePartsUsed(index: number) {
    this.partsUsedArray.removeAt(index);
  }

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
  }

  submitRepair(submittedRepair: RepairFormFields): void {

    this.store.dispatch(addRepair({ submittedRepair: submittedRepair }))

  };

  ngOnInit(): void {

    this.store.dispatch(loadLocationNames());

    this.filteredLocNames$ = combineLatest([
      this.adminRepairForm.controls.radioLocation.valueChanges.pipe(startWith('')),
      this.orgName$.pipe(),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filteredLocs(locName, orgName, locations))
    )

    this.activatedRoute.paramMap.subscribe(params => {
      const radioID = params.get('radioID');
      if (radioID) {
        this.adminRepairForm.patchValue({ radioID: radioID })
      }
    });

    
  }

  private _filteredLocs(locValue: string | null, orgName: string | null, locations: Location[]): string[] {
    const filteredLocValue = (locValue || '').toLowerCase();
    const org = ( orgName || '').toLowerCase();

    let locOptions: string[] = [];

    locations.forEach((loc) => {
      if (loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === org ) {
        locOptions.push(loc.locationName);
      }
    });

    return locOptions;
  }

  onSubmit() {

    console.log(this.adminRepairForm.value);

    const submittedRepair: RepairFormFields = {
      radioID: this.adminRepairForm.value.radioID ?? '',
      radioMake: this.adminRepairForm.value.radioMake ?? '',
      radioSerial: this.adminRepairForm.value.radioSerial ?? '',
      radioLocation: this.adminRepairForm.value.radioLocation ?? '',
      dateReceived: this.adminRepairForm.value.dateReceived ?? new Date(),
      endUserPO: this.adminRepairForm.value.endUserPO  ?? '',
      raaPO: this.adminRepairForm.value.raaPO  ?? '',
      dateSentTech: this.adminRepairForm.value.dateSentTech ?? new Date(),
      dateRecTech: this.adminRepairForm.value.dateRecTech ?? new Date(),
      dateSentEU: this.adminRepairForm.value.dateSentEU ?? new Date(),
      techInvNum: this.adminRepairForm.value.techInvNum ?? '',
      raaInvNum: this.adminRepairForm.value.raaInvNum ?? '',
      symptoms: Array.isArray(this.adminRepairForm.value.symptoms) ? this.adminRepairForm.value.symptoms : [''],
      testFreq: this.adminRepairForm.value.testFreq ?? '',
      incRxSens: this.adminRepairForm.value.incRxSens ?? '',
      incFreqErr: this.adminRepairForm.value.incFreqErr ?? '',
      incMod: this.adminRepairForm.value.incMod ?? '',
      incPowerOut: this.adminRepairForm.value.incPowerOut ?? '',
      outRxSens: this.adminRepairForm.value.outRxSens ?? '',
      outFreqErr: this.adminRepairForm.value.outFreqErr ?? '',
      outMod: this.adminRepairForm.value.outMod  ?? '',
      outPowerOut: this.adminRepairForm.value.outPowerOut ?? '',
      accessories: Array.isArray(this.adminRepairForm.value.accessories) ? this.adminRepairForm.value.accessories : [''],
      workPerformed: Array.isArray(this.adminRepairForm.value.workPerformed) ? this.adminRepairForm.value.workPerformed : [''],
      repHours: this.adminRepairForm.value.repHours  ?? 0,
      partsUsed: Array.isArray(this.adminRepairForm.value.partsUsed) ? this.adminRepairForm.value.partsUsed : [''],
      remarks: this.adminRepairForm.value.remarks ?? '',
    }


    this.submitRepair(submittedRepair)

  };

}
