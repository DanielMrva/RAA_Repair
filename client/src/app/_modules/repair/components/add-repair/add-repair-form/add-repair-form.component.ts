import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AppState } from '@app/_store/app.state';
import { RepairFormFields, UpdateRepairFields } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { addRepair } from '@app/_store/_repair-store/repair.actions';
import { withLatestFrom, first, of, Subscription, filter, combineLatest } from 'rxjs';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { MismatchModalService } from '@app/services/modal/mismatch-modal.service';
import { filterEmptyArrayValues } from '@app/utils/filterEmptyArray';
import { AccessControlService } from '@app/services/accessControl/access-control.service';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER, AccessLevel } from '@app/utils/constants';
import { updateArrayControl } from '@app/utils/updateArrayControl';

@Component({
  selector: 'app-add-repair-form',
  templateUrl: './add-repair-form.component.html',
  styleUrls: ['./add-repair-form.component.css']
})
export class AddRepairFormComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  oneRadio$
  radioError$
  radioIsLoading$


  USER_ACCESS = ACCESS_LEVEL_USER;
  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  initialOrgName: string = '';
  initialLocationName: string = '';

  // filteredLocationNames: string[] = [];

  selectedOrg: string = '';

  radioID!: string;



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

  private editableFields: Record<AccessLevel, string[]> = {
    admin: ['*'],
    tech: ['dateSentRaaTech', 'repairStatus', 'techInvNum', 'accessories', 'symptoms', 'testFreq', 'incRxSens', 'incFreqErr', 'incMod', 'incPowerOut', 'outRxSens', 'outFreqErr', 'outMod', 'outPowerOut', 'workPerformed', 'partsUsed', 'remarks', 'repHours'],
    user: ['reportedBy', 'repairStatus', 'dateRepairAdded', 'dateSentEuRaa', 'accessories', 'symptoms', 'remarks'],
  };

  showOtherAccessory = false;
  showOtherBattery = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private mismatchModalService: MismatchModalService,
    private formBuilder: FormBuilder,
    private accessControlService: AccessControlService
  ) {
    this.oneRadio$ = this.store.select(selectOneRadio);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.radioIsLoading$ = this.store.select(radioLoadingSelector);
  }



  repairForm = new FormGroup({
    radioID: new FormControl<string>(''),
    radioMake: new FormControl<string>(''),
    radioSerial: new FormControl<string>(''),
    radioOrg: new FormControl<string>(''),
    radioLocation: new FormControl<string>(''),
    reportedBy: new FormControl<string>(''),
    endUserPO: new FormControl<string>(''),
    raaPO: new FormControl<string>(''),
    repairStatus: new FormControl<string>(''),
    dateRepairAdded: new FormControl<Date | null>(new Date()),
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
    return this.repairForm.get('symptoms') as FormArray;
  }

  get accessoriesGroup(): FormGroup {
    return this.repairForm.get('accessories') as FormGroup;
  }

  get workPerformedArray(): FormArray {
    return this.repairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.repairForm.get('partsUsed') as FormArray;
  }

  updatePartsUsed(newParts: string[]): void {
    const partsArray = this.repairForm.get('partsUsed') as FormArray;
    updateArrayControl(newParts, partsArray);
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

  fieldValidCheck(field: string) {
    if (
      this.repairForm.get(`${field}`)?.invalid &&
      this.repairForm.get(`${field}`)?.dirty ||
      this.repairForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
      return true
    } else {
      return false
    }
  };

  ngOnInit(): void {
    // 1) Subscribe to route params to load radio by ID
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe(params => {
        const radioID = params.get('radioID');
        if (radioID) {
          this.store.dispatch(loadOneRadio({ radioID }));
        }
      })
    );
  
    // 2) Wait for the radio data
    this.subscriptions.add(
      this.oneRadio$.pipe(
        // Optional: filter out null/undefined
        filter(radio => !!radio),
        // Optional: first() if you only want the first emission
        first()
      ).subscribe(radio => {
        // Patch form with radio data
        this.repairForm.patchValue({
          radioID: radio?._id || '',
          radioSerial: radio?.serialNumber || '',
          radioMake: radio?.make || '',
          radioOrg: radio?.orgName || '',
          radioLocation: radio?.locationName || ''
        });
        this.initialOrgName = radio?.orgName || '';
        this.initialLocationName = radio?.locationName || '';
  
        // Now that we have the form populated, call access control
        this.accessControlService.setFormControlsAccessibility(
          this.repairForm,
          this.editableFields
        );
      })
    );
  }
  
  handleOrgSelection(org: string): void {
    this.selectedOrg = org;
    this.repairForm.patchValue({ radioOrg: org });
  }
  
  handleLocSelection(loc: string): void {
    this.repairForm.patchValue({ radioLocation: loc });
  }

  onAccessoriesChange(event: any): void {
    const selectedValues = event.value;
    this.showOtherAccessory = selectedValues.includes('Other (specify)');
    this.showOtherBattery = selectedValues.includes('Battery (Other - specify)');
    if (!this.showOtherAccessory) {
      this.accessoriesGroup.patchValue({ otherAccessory: '' });
    }
    if (!this.showOtherBattery) {
      this.accessoriesGroup.patchValue({ otherBattery: '' });
    }
  };

  prepareRepairData(): RepairFormFields {
    const enabledControls = this.accessControlService.enableAllControls(this.repairForm);
    const accessoriesGroup = this.repairForm.get('accessories') as FormGroup;
    let accessories = accessoriesGroup.value.selectedAccessories.slice();

    // Filter out "Battery (Other - specify)" and "Other (specify)"
    accessories = accessories.filter((accessory: string) =>
      accessory !== 'Battery (Other - specify)' && accessory !== 'Other (specify)');

    if (accessoriesGroup.value.otherAccessory) {
      accessories.push(`Other: ${accessoriesGroup.value.otherAccessory}`);
    }
    if (accessoriesGroup.value.otherBattery) {
      accessories.push(`Battery (Other - specify): ${accessoriesGroup.value.otherBattery}`);
    }

    const repairData: RepairFormFields = {
      radioID: this.radioID ?? this.repairForm.value.radioID,
      radioMake: this.repairForm.value.radioMake ?? '',
      radioSerial: this.repairForm.value.radioSerial ?? '',
      radioOrg: this.repairForm.value.radioOrg ?? '',
      radioLocation: this.initialLocationName ?? this.repairForm.value.radioLocation ?? '',
      reportedBy: this.repairForm.value.reportedBy ?? '',
      endUserPO: this.repairForm.value.endUserPO ?? '',
      raaPO: this.repairForm.value.raaPO ?? '',
      repairStatus: this.repairForm.value.repairStatus ?? '',
      dateRepairAdded: this.repairForm.value.dateRepairAdded ?? null,
      dateSentEuRaa: this.repairForm.value.dateSentEuRaa ?? null,
      dateRecEuRaa: this.repairForm.value.dateRecEuRaa ?? null,
      dateSentRaaTech: this.repairForm.value.dateSentRaaTech ?? null,
      dateRecTechRaa: this.repairForm.value.dateRecTechRaa ?? null,
      dateSentRaaEu: this.repairForm.value.dateSentRaaEu ?? null,
      techInvNum: this.repairForm.value.techInvNum ?? '',
      raaInvNum: this.repairForm.value.raaInvNum ?? '',
      symptoms: filterEmptyArrayValues(this.repairForm.value.symptoms ?? []),
      testFreq: this.repairForm.value.testFreq ?? '',
      incRxSens: this.repairForm.value.incRxSens ?? '',
      incFreqErr: this.repairForm.value.incFreqErr ?? '',
      incMod: this.repairForm.value.incMod ?? '',
      incPowerOut: this.repairForm.value.incPowerOut ?? '',
      outRxSens: this.repairForm.value.outRxSens ?? '',
      outFreqErr: this.repairForm.value.outFreqErr ?? '',
      outMod: this.repairForm.value.outMod ?? '',
      outPowerOut: this.repairForm.value.outPowerOut ?? '',
      accessories: filterEmptyArrayValues(accessories),
      workPerformed: filterEmptyArrayValues(this.repairForm.value.workPerformed ?? []),
      repHours: this.repairForm.value.repHours ?? 0,
      partsUsed: filterEmptyArrayValues(this.repairForm.value.partsUsed ?? []),
      remarks: this.repairForm.value.remarks ?? ''
    };

    this.accessControlService.restoreDisabledControls(this.repairForm, enabledControls);

    return repairData;
  }

  submitRepair(): void {
    const submittedRepair: RepairFormFields = this.prepareRepairData();
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
      of(this.repairForm.value).pipe(
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

