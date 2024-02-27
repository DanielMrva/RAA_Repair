import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
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
    radioLocation: new FormControl<string>(''),
    dateReceived: new FormControl<string>(''),
    endUserPO: new FormControl<string>(''),
    raaPO: new FormControl<string>(''),
    dateSentTech: new FormControl<string>(''),
    dateRecTech: new FormControl<string>(''),
    dateSentEU: new FormControl<string>(''),
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


    const radioID = this.adminRepairForm.value.radioID ?? '';
    const radioLocation = this.adminRepairForm.value.radioLocation ?? '';
    const dateReceived = this.adminRepairForm.value.dateReceived ?? '';
    const endUserPO = this.adminRepairForm.value.endUserPO  ?? '';
    const raaPO = this.adminRepairForm.value.raaPO  ?? '';
    const dateSentTech = this.adminRepairForm.value.dateSentTech ?? '';
    const dateRecTech = this.adminRepairForm.value.dateRecTech ?? '';
    const dateSentEU = this.adminRepairForm.value.dateSentEU ?? '';
    const techInvNum = this.adminRepairForm.value.techInvNum ?? '';
    const raaInvNum = this.adminRepairForm.value.raaInvNum ?? '';
    const symptoms = Array.isArray(this.adminRepairForm.value.symptoms) ? this.adminRepairForm.value.symptoms : ['']; 
    const testFreq = this.adminRepairForm.value.testFreq ?? '';
    const incRxSens = this.adminRepairForm.value.incRxSens ?? '';
    const incFreqErr = this.adminRepairForm.value.incFreqErr ?? '';
    const incMod = this.adminRepairForm.value.incMod ?? '';
    const incPowerOut = this.adminRepairForm.value.incPowerOut ?? '';
    const outRxSens = this.adminRepairForm.value.outRxSens ?? '';
    const outFreqErr = this.adminRepairForm.value.outFreqErr ?? '';
    const outMod = this.adminRepairForm.value.outMod  ?? '';
    const outPowerOut = this.adminRepairForm.value.outPowerOut ?? '';
    const accessories = Array.isArray(this.adminRepairForm.value.accessories) ? this.adminRepairForm.value.accessories : [''];
    const workPerformed = Array.isArray(this.adminRepairForm.value.workPerformed) ? this.adminRepairForm.value.workPerformed : ['']; 
    const repHours = this.adminRepairForm.value.repHours  ?? 0;
    const partsUsed = Array.isArray(this.adminRepairForm.value.partsUsed) ? this.adminRepairForm.value.partsUsed : [''];
    const remarks = this.adminRepairForm.value.remarks ?? '';

    this.store.dispatch(addRepair({
      radioID,
      radioLocation,
      dateReceived,
      endUserPO,
      raaPO,
      dateSentTech,
      dateRecTech,
      dateSentEU,
      techInvNum,
      raaInvNum,
      symptoms,
      testFreq,
      incRxSens,
      incFreqErr,
      incMod,
      incPowerOut,
      outRxSens,
      outFreqErr,
      outMod,
      outPowerOut,
      accessories,
      workPerformed,
      repHours,
      partsUsed,
      remarks
    }))

  };

}
