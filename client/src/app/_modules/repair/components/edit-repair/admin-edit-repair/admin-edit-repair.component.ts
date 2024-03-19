import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Organization, Radio, Repair, RepairFormFields } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editRepair, loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { selectLocationNames, locationErrorSelector, locationLoadingSelector } from '@app/_store/_location-store/location.selectors';
import { selectOrgName, selectAccessLevel } from '@app/_store/_auth-store/auth.selectors';
import { selectOneRadio, selectOneRadioOrg } from '@app/_store/_radio-store/radio.selectors';
import { loadOneRadio, loadSerialRadio } from '@app/_store/_radio-store/radio.actions';
import { loadLocationByName, loadLocationNames } from '@app/_store/_location-store/location.actions';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators'
import { Location } from '@app/graphql/schemas';
import { orgErrorSelector, orgLoadingSelector, selectOrgNames } from '@app/_store/_org-store/org.selectors';


@Component({
  selector: 'app-admin-edit-repair',
  templateUrl: './admin-edit-repair.component.html',
  styleUrls: ['./admin-edit-repair.component.css']
})
export class AdminEditRepairComponent implements OnInit {

  isLoading$ = this.store.select(repairLoadingSelector);
  repairError$ = this.store.select(repairErrorSelector);
  oneRepair$ = this.store.select(selectOneRepair);

  repairID!: string;
  repairTag!: number;
  radioID!: string;

  orgNames$ = this.store.select(selectOrgNames);
  isLoadingOrgNames$ = this.store.select(orgLoadingSelector);
  orgNameError$ = this.store.select(orgErrorSelector);
  orgNameOptions: string[] = [];
  filteredOrgNames$!: Observable<string[]>;
  selectedOrg$: Observable<string | null> = of('');

  parentRadio$ = this.store.select(selectOneRadio);

  locationNames$ = this.store.select(selectLocationNames);
  isLoadingLocationNames$ = this.store.select(locationLoadingSelector);
  locationNameError$ = this.store.select(locationErrorSelector);
  locNameOptions: string[] = [];
  filteredLocNames$!: Observable<string[]>;

  orgForm = new FormGroup({
    selectedOrgControl: new FormControl<string>('')

  })


  repairForm = new FormGroup({
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
    symptoms: new FormArray([]),
    testFreq: new FormControl<string>(''),
    incRxSens: new FormControl<string>(''),
    incFreqErr: new FormControl<string>(''),
    incMod: new FormControl<string>(''),
    incPowerOut: new FormControl<string>(''),
    outRxSens: new FormControl<string>(''),
    outFreqErr: new FormControl<string>(''),
    outMod: new FormControl<string>(''),
    outPowerOut: new FormControl<string>(''),
    accessories: new FormArray([]),
    workPerformed: new FormArray([]),
    repHours: new FormControl<number>(0),
    partsUsed: new FormArray([]),
    remarks: new FormControl<string>(''),
  });

  get symptomsArray(): FormArray {
    return this.repairForm.get('symptoms') as FormArray;
  }

  get accessoriesArray(): FormArray {
    return this.repairForm.get('accessories') as FormArray;
  }

  get workPerformedArray(): FormArray {
    return this.repairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.repairForm.get('partsUsed') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  onOrgSelectionChange(org: string): void {
    // Update the form control value with the selected organization
    this.orgForm.controls.selectedOrgControl?.setValue(org);
  }


  loadRepair(id: string): void {

    this.store.dispatch(loadOneRepair({ repairID: id }))
  }

  populateForm() {

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairForm.patchValue({
          radioID: repair.radioID,
          radioLocation: repair.radioLocation,
          dateReceived: new Date(parseInt(repair.dateReceived)),
          endUserPO: repair.endUserPO,
          raaPO: repair.raaPO,
          dateSentTech: new Date(parseInt(repair.dateSentTech)),
          dateRecTech: new Date(parseInt(repair.dateRecTech)),
          dateSentEU: new Date(parseInt(repair.dateSentEU)),
          techInvNum: repair.techInvNum,
          raaInvNum: repair.raaInvNum,
          testFreq: repair.testFreq,
          incRxSens: repair.incRxSens,
          incFreqErr: repair.incFreqErr,
          incMod: repair.incMod,
          incPowerOut: repair.incPowerOut,
          outRxSens: repair.outRxSens,
          outFreqErr: repair.outFreqErr,
          outMod: repair.outMod,
          outPowerOut: repair.outPowerOut,
          repHours: repair.repHours,
          remarks: repair.remarks

        });

        repair.symptoms.forEach(symptom => {
          (this.repairForm.get('symptoms') as FormArray).push(this.formBuilder.control(symptom));
        });

        repair.accessories.forEach(accessory => {
          (this.repairForm.get('accessories') as FormArray).push(this.formBuilder.control(accessory));
        });
        repair.workPerformed.forEach(work => {
          (this.repairForm.get('workPerformed') as FormArray).push(this.formBuilder.control(work));
        });
        repair.partsUsed.forEach(part => {
          (this.repairForm.get('partsUsed') as FormArray).push(this.formBuilder.control(part));
        });

      }
    })
  };

  addSymptom() {
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true }));
  };

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  };


  addAccessory() {
    console.log('accessory click')
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


  updateRepair(updateRepair: RepairFormFields): void {

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairID = repair._id;
      }

    })

    this.store.dispatch(editRepair({ id: this.repairID, updates: updateRepair }))

  };

  onSubmit() {

    console.log(this.repairForm.value)

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairTag = repair.repairTag;
      }
    })

    const submittedRepair: RepairFormFields = {
      radioID: this.repairForm.value.radioID ?? '',
      radioMake: this.repairForm.value.radioMake ?? '',
      radioSerial: this.repairForm.value.radioSerial ?? '',
      radioLocation: this.repairForm.value.radioLocation ?? '',
      dateReceived: this.repairForm.value.dateReceived ?? new Date(),
      endUserPO: this.repairForm.value.endUserPO ?? '',
      raaPO: this.repairForm.value.raaPO ?? '',
      repairTag: this.repairTag,
      dateSentTech: this.repairForm.value.dateSentTech ?? new Date(),
      dateRecTech: this.repairForm.value.dateRecTech ?? new Date(),
      dateSentEU: this.repairForm.value.dateSentEU ?? new Date(),
      techInvNum: this.repairForm.value.techInvNum ?? '',
      raaInvNum: this.repairForm.value.raaInvNum ?? '',
      symptoms: Array.isArray(this.repairForm.value.symptoms) ? this.repairForm.value.symptoms.map(symptom => symptom ?? '') : [''],
      testFreq: this.repairForm.value.testFreq ?? '',
      incRxSens: this.repairForm.value.incRxSens ?? '',
      incFreqErr: this.repairForm.value.incFreqErr ?? '',
      incMod: this.repairForm.value.incMod ?? '',
      incPowerOut: this.repairForm.value.incPowerOut ?? '',
      outRxSens: this.repairForm.value.outRxSens ?? '',
      outFreqErr: this.repairForm.value.outFreqErr ?? '',
      outMod: this.repairForm.value.outMod ?? '',
      outPowerOut: this.repairForm.value.outPowerOut ?? '',
      accessories: Array.isArray(this.repairForm.value.accessories) ? this.repairForm.value.accessories.map(a => a ?? '') : [''],
      workPerformed: Array.isArray(this.repairForm.value.workPerformed) ? this.repairForm.value.workPerformed.map(wp => wp ?? '') : [''],
      repHours: this.repairForm.value.repHours ?? 0,
      partsUsed: Array.isArray(this.repairForm.value.partsUsed) ? this.repairForm.value.partsUsed.map(pu => pu ?? '') : [''],
      remarks: this.repairForm.value.remarks ?? '',
    };


    this.updateRepair(submittedRepair);
  }

  ngOnInit(): void {

    this.store.dispatch(loadLocationNames());

    this.repairForm.patchValue({
      radioID: '',
      radioMake: '',
      radioSerial: '',
      radioLocation: '',
      dateReceived: new Date(),
      endUserPO: '',
      raaPO: '',
      dateSentTech: new Date(),
      dateRecTech: new Date(),
      dateSentEU: new Date(),
      techInvNum: '',
      raaInvNum: '',
      symptoms: [],
      testFreq: '',
      incRxSens: '',
      incFreqErr: '',
      incMod: '',
      incPowerOut: '',
      outRxSens: '',
      outFreqErr: '',
      outMod: '',
      outPowerOut: '',
      accessories: [],
      workPerformed: [],
      repHours: 0,
      partsUsed: [],
      remarks: ''

    });

    this.repairForm.get('radioID')?.disable();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.repairID = params['id'];
      this.loadRepair(this.repairID);
    });

    this.populateForm();

    // this.oneRepair$.subscribe((repair: Repair | null) => {
    //   if (repair) {
    //     this.radioID = repair.radioID;
        
    //     this.store.dispatch(loadOneRadio({ radioID: this.radioID }));
    //     this.store.dispatch(loadLocationByName({ locationName: repair.radioLocation }));
    //   }
    // });

    this.filteredOrgNames$ = this.selectedOrg$.pipe(
      startWith(''),
      map(value => this._filterOrgs(value || ''))
    )

    this.filteredLocNames$ = combineLatest([
      this.repairForm.controls.radioLocation.valueChanges.pipe(startWith('')),
      this.selectedOrg$.pipe(startWith('')),
      this.locationNames$,
    ]).pipe(
      map(([locName, orgName, locations]) => this._filterLocs(locName, orgName, locations))
    );

  };

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


  private _filterLocs(locValue: string | null, orgValue: string | null, locations: Location[]): string[] {
    const filteredLocValue = (locValue || '').toLowerCase();
    const filteredOrgValue = (orgValue || '').toLowerCase();

    let locOptions: string[] = [];

    locations.forEach((loc) => {
      if (loc.locationName.toLowerCase().includes(filteredLocValue) && loc.orgName.toLowerCase() === filteredOrgValue) {
        locOptions.push(loc.locationName);
      }
    });

    return locOptions;
  }

}
