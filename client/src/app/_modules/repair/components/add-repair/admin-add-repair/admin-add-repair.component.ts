import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { RepairFormFields, UpdateRepairFields } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { addRepair } from '@app/_store/_repair-store/repair.actions';
import { withLatestFrom, first, of, Subscription } from 'rxjs';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { MismatchModalService } from '@app/services/modal/mismatch-modal.service';
import { filterEmptyArrayValues } from '@app/utils/filterEmptyArray';

@Component({
  selector: 'app-admin-add-repair',
  templateUrl: './admin-add-repair.component.html',
  styleUrls: ['./admin-add-repair.component.css']
})
export class AdminAddRepairComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  oneRadio$
  radioError$
  radioIsLoading$

  initialOrgName: string | null = null;

  filteredLocationNames: string[] = [];

  accessoryOptions: string[] = [
    'Microphone',
    'Mounting Bracket',
    'Mounting Bracket Screws',
    'Power Cable',
    'External Speaker',
    'Accessory Cable',
    'Antenna (Regular Length)',
    'Antenna (Stubby)',
    'Battery (Regular Capacity)',
    'Battery (High Capacity)',
    'Belt Clip',
    'Charger',
    'Speaker/Mic',
    'Headset',
    'Battery (Other - specify)',
    'Other (specify)'
  ];

  showOtherAccessory = false;
  showOtherBattery = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private mismatchModalService: MismatchModalService,
    private formBuilder: FormBuilder
  ) {
    this.oneRadio$ = this.store.select(selectOneRadio);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.radioIsLoading$ = this.store.select(radioLoadingSelector);
  }



  adminRepairForm = new FormGroup({
    radioID: new FormControl<string>(''),
    radioMake: new FormControl<string>(''),
    radioSerial: new FormControl<string>(''),
    radioOrg: new FormControl<string>(''),
    radioLocation: new FormControl<string>(''),
    reportedBy: new FormControl<string>(''),
    endUserPO: new FormControl<string>(''),
    raaPO: new FormControl<string>(''),
    repairStatus: new FormControl<string>(''),
    dateRepairAdded: new FormControl<Date | null>(null),
    dateSentEuRaa: new FormControl<Date | null>(null),
    dateRecEuRaa: new FormControl<Date | null>(null),
    dateSentRaaTech: new FormControl<Date | null>(null),
    dateRecTechRaa: new FormControl<Date | null>(null),
    dateSentRaaEu: new FormControl<Date | null>(null),
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
    accessories: new FormGroup({
      selectedAccessories: new FormControl<string[]>([]),
      otherAccessory: new FormControl<string>(''),
      otherBattery: new FormControl<string>('')
    }),
    workPerformed: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    repHours: new FormControl<number>(0),
    partsUsed: new FormArray([new FormControl<string>('', { nonNullable: true })]),
    remarks: new FormControl<string>(''),
  });

  isSubmitted = false;

  get symptomsArray(): FormArray {
    return this.adminRepairForm.get('symptoms') as FormArray;
  }

  get accessoriesGroup(): FormGroup {
    return this.adminRepairForm.get('accessories') as FormGroup;
  }

  get workPerformedArray(): FormArray {
    return this.adminRepairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.adminRepairForm.get('partsUsed') as FormArray;
  }


  addSymptom() {
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true }));
  }

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  }

  addWorkPerformed() {
    this.workPerformedArray.push(new FormControl<string>('', { nonNullable: true }));
  }

  removeWorkPerformed(index: number) {
    this.workPerformedArray.removeAt(index);
  }

  addPartsUsed() {
    this.partsUsedArray.push(new FormControl<string>('', { nonNullable: true }));
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
  };

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe(params => {
        const radioID = params.get('radioID');
        if (radioID) {
          this.adminRepairForm.patchValue({ radioID: radioID });
          this.store.dispatch(loadOneRadio({ radioID }));
          this.oneRadio$.subscribe(radio => {
            if (radio) {
              this.adminRepairForm.patchValue({
                radioID: radio._id,
                radioSerial: radio.serialNumber,
                radioMake: radio.make,
                radioOrg: radio.orgName, // Populate the new field here
              });
              this.initialOrgName = radio.orgName;
            }
          });
        }
      })
    );
  }
  
  handleOrgNameSelected(orgName: string): void {
    this.adminRepairForm.patchValue({radioOrg: orgName});
  };

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocationNames = locations;
  };

  onAccessoriesChange(event: any): void {
    const selectedValues = event.value;
    this.showOtherAccessory = selectedValues.includes('Other (specify)');
    this.showOtherBattery = selectedValues.includes('Battery (Other - specify)');
    if (!this.showOtherAccessory) {
      this.accessoriesGroup.patchValue({ otherAccessory: '' });
    }
    if (!this.showOtherBattery) {
      this.accessoriesGroup.patchValue({ otherBattery: ''});
    }
  };

  prepaireRepairData(): RepairFormFields {
    let accessories = this.accessoriesGroup.value.selectedAccessories;
  
    // Filter out "Battery (Other - specify)" and "Other (specify)"
    accessories = accessories.filter((accessory: string) => 
      accessory !== 'Battery (Other - specify)' && accessory !== 'Other (specify)');
  
    // Add concatenated values if they exist
    if (this.accessoriesGroup.value.otherAccessory) {
      accessories.push(`Other: ${this.accessoriesGroup.value.otherAccessory}`);
    }
    if (this.accessoriesGroup.value.otherBattery) {
      accessories.push(`Battery (Other - specify): ${this.accessoriesGroup.value.otherBattery}`);
    }
  
    return {
      radioID: this.adminRepairForm.value.radioID ?? '',
      radioMake: this.adminRepairForm.value.radioMake ?? '',
      radioSerial: this.adminRepairForm.value.radioSerial ?? '',
      radioOrg: this.adminRepairForm.value.radioOrg ?? '',
      radioLocation: this.adminRepairForm.value.radioLocation ?? '',
      reportedBy: this.adminRepairForm.value.reportedBy ?? '',
      endUserPO: this.adminRepairForm.value.endUserPO ?? '',
      raaPO: this.adminRepairForm.value.raaPO ?? '',
      repairStatus: this.adminRepairForm.value.repairStatus ?? '',
      dateRepairAdded: this.adminRepairForm.value.dateRepairAdded ?? null,
      dateSentEuRaa: this.adminRepairForm.value.dateSentEuRaa ?? null,
      dateRecEuRaa: this.adminRepairForm.value.dateRecEuRaa ?? null,
      dateSentRaaTech: this.adminRepairForm.value.dateSentRaaTech ?? null,
      dateRecTechRaa: this.adminRepairForm.value.dateRecTechRaa ?? null,
      dateSentRaaEu: this.adminRepairForm.value.dateSentRaaEu ?? null,
      techInvNum: this.adminRepairForm.value.techInvNum ?? '',
      raaInvNum: this.adminRepairForm.value.raaInvNum ?? '',
      symptoms: filterEmptyArrayValues(this.adminRepairForm.value.symptoms ?? []),
      testFreq: this.adminRepairForm.value.testFreq ?? '',
      incRxSens: this.adminRepairForm.value.incRxSens ?? '',
      incFreqErr: this.adminRepairForm.value.incFreqErr ?? '',
      incMod: this.adminRepairForm.value.incMod ?? '',
      incPowerOut: this.adminRepairForm.value.incPowerOut ?? '',
      outRxSens: this.adminRepairForm.value.outRxSens ?? '',
      outFreqErr: this.adminRepairForm.value.outFreqErr ?? '',
      outMod: this.adminRepairForm.value.outMod ?? '',
      outPowerOut: this.adminRepairForm.value.outPowerOut ?? '',
      accessories: filterEmptyArrayValues(accessories),
      workPerformed: filterEmptyArrayValues(this.adminRepairForm.value.workPerformed ?? []),
      repHours: this.adminRepairForm.value.repHours ?? 0,
      partsUsed: filterEmptyArrayValues(this.adminRepairForm.value.partsUsed ?? []),
      remarks: this.adminRepairForm.value.remarks ?? ''
    }
  };
    
  submitRepair(): void {
    const submittedRepair: RepairFormFields = this.prepaireRepairData();
    this.store.dispatch(addRepair({ submittedRepair }));
  };

  handleSubmission(formValue: any, oneRadio: any): void {
    const formRadioLocation = formValue.radioLocation || '';
    const oneRadioLocationName = oneRadio?.locationName || '';
    const radioId = oneRadio?._id || '';

    if (formRadioLocation !== oneRadioLocationName) {
      this.mismatchModalService.openMismatchDialog(
        formRadioLocation,
        oneRadioLocationName,
        radioId,
        () => this.submitRepair()
      )
    } else {
      this.submitRepair()
    }
  };

  onSubmit() {
    this.subscriptions.add(
      of(this.adminRepairForm.value).pipe(
        withLatestFrom(this.oneRadio$),
        first(),
      ).subscribe(([formValue, oneRadio]) => {
        this.handleSubmission(formValue, oneRadio);
      })
    );
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

}
