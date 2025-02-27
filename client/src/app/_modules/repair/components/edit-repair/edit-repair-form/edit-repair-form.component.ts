import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, of, withLatestFrom, Subscription, combineLatest } from 'rxjs';

import { AppState } from '@app/_store/app.state';
import { editRepair, loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';

import { MismatchModalService } from '@app/services/modal/mismatch-modal.service';
import { AddPartModalService } from '@app/services/modal/add-part-modal.service';
import { AccessControlService } from '@app/services/accessControl/access-control.service';

import { updateArrayControl } from '@app/utils/updateArrayControl';
import { filterEmptyArrayValues } from '@app/utils/filterEmptyArray';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER, AccessLevel } from '@app/utils/constants';
import { Radio, Repair, RepairFormFields } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-edit-repair-form',
  templateUrl: './edit-repair-form.component.html',
  styleUrls: ['./edit-repair-form.component.css']
})
export class EditRepairFormComponent implements OnDestroy, OnInit {

  /**Lifecycle & Observables */
  private subscriptions = new Subscription();

  oneRadio$ = this.store.select(selectOneRadio);
  oneRepair$ = this.store.select(selectOneRepair);

  radioError$ = this.store.select(radioErrorSelector);
  radioIsLoading$ = this.store.select(radioLoadingSelector);

  repairError$ = this.store.select(repairErrorSelector);
  isLoading$ = this.store.select(repairLoadingSelector);

  /** Constants */
  USER_ACCESS = ACCESS_LEVEL_USER;
  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  private editableFields: Record<AccessLevel, string[]> = {
    admin: ['*'],
    tech: ['dateSentRaaTech', 'repairStatus', 'techInvNum', 'accessories', 'symptoms', 'testFreq', 'incRxSens', 'incFreqErr', 'incMod', 'incPowerOut', 'outRxSens', 'outFreqErr', 'outMod', 'outPowerOut', 'partsUsed', 'remarks', 'repHours', 'workPerformed'],
    user: ['radioOrg', 'radioLocation', 'reportedBy', 'repairStatus', 'dateRepairAdded', 'dateSentEuRaa', 'dateSentRaaEu', 'accessories', 'symptoms'],
  };

  /** Form-related Variables */
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
    dateSentEuRaa: new FormControl<Date | null>(new Date()),
    dateRecEuRaa: new FormControl<Date | null>(new Date()),
    dateSentRaaTech: new FormControl<Date | null>(new Date()),
    dateRecTechRaa: new FormControl<Date | null>(new Date()),
    dateSentRaaEu: new FormControl<Date | null>(new Date()),
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

  initialOrgName = '';
  initialLocationName = '';

  selectedOrg = '';

  repairID!: string;
  radioId!: string;
  repairTag!: number;

  showOtherAccessory = false;
  showOtherBattery = false;

  /** Accessory Options */
  accessoryOptions: string[] = [
    'Microphone', 'Mounting Bracket', 'Mounting Bracket Screws', 'Power Cable', 'External Speaker',
    'Accessory Cable', 'Antenna (Regular Length)', 'Antenna (Stubby)', 'Battery (Regular Capacity)', 'Battery (High Capacity)',
    'Belt Clip', 'Charger', 'Speaker/Mic', 'Headset', 'Dust Cover', 'Battery (Other - specify)', 'Other (specify)'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private mismatchModalService: MismatchModalService,
    private addPartModalService: AddPartModalService,
    private accessControlService: AccessControlService
  ) { }

  /** Lifecycle Hooks */

  ngOnInit(): void {
    this.repairForm.get('radioID')?.disable();

    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe(params => {
        const repairID = params.get('id');
        if (repairID) {
          this.loadRepair(repairID);

          // Use combineLatest to ensure both observables are in sync before populating the form
          this.subscriptions.add(
            combineLatest([this.oneRepair$, this.oneRadio$]).subscribe(([repair, radio]) => {
              if (repair && radio) {
                this.repairID = repair._id;
                this.radioId = radio._id;
                this.populateForm(repair, radio);
                this.initialOrgName = repair.radioOrg;
                this.initialLocationName = repair.radioLocation;

                console.log(this.initialLocationName)
                console.log(this.initialOrgName)

              }
            })
          );

        }
      })
    );

    this.accessControlService.setFormControlsAccessibility(this.repairForm, this.editableFields)


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  /**Form Interactions */

  get accessoriesGroup(): FormGroup {
    return this.repairForm.get('accessories') as FormGroup;
  }

  get symptomsArray(): FormArray {
    return this.repairForm.get('symptoms') as FormArray;
  }

  get workPerformedArray(): FormArray {
    return this.repairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.repairForm.get('partsUsed') as FormArray;
  }

  updatePartsUsed(newParts: string[]): void {
    const partsArray = this.repairForm.get('partsUsed') as FormArray;
    updateArrayControl(newParts, partsArray)
  };


  /** Data Fetching */

  loadRepair(id: string): void {
    this.store.dispatch(loadOneRepair({ repairID: id }));
  }

  populateForm(repair: Repair, radio: Radio) {
    this.repairForm.patchValue({
      radioID: repair.radioID,
      radioMake: repair.radioMake,
      radioSerial: repair.radioDetails ? repair.radioDetails.radioSerial : radio.serialNumber,
      radioOrg: repair.radioOrg,
      radioLocation: repair.radioLocation,
      reportedBy: repair.reportedBy,
      endUserPO: repair.endUserPO,
      raaPO: repair.raaPO,
      repairStatus: repair.repairStatus,
      dateRepairAdded: new Date(parseInt(repair.dateRepairAdded)),
      dateSentEuRaa: new Date(parseInt(repair.dateSentEuRaa)),
      dateRecEuRaa: new Date(parseInt(repair.dateRecEuRaa)),
      dateSentRaaTech: new Date(parseInt(repair.dateSentRaaTech)),
      dateRecTechRaa: new Date(parseInt(repair.dateRecTechRaa)),
      dateSentRaaEu: new Date(parseInt(repair.dateSentRaaEu)),
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
      remarks: repair.remarks,
    });

    const resetFormArray = (formArrayName: string, items: string[]) => {
      const formArray = this.repairForm.get(formArrayName) as FormArray;
      formArray.clear();
      if (items.length === 0) {
        formArray.push(new FormControl<string>('', { nonNullable: true }));
      } else {
        items.forEach(item => formArray.push(new FormControl<string>(item, { nonNullable: true })));
      }
    };

    resetFormArray('symptoms', repair.symptoms);
    resetFormArray('workPerformed', repair.workPerformed);
    resetFormArray('partsUsed', repair.partsUsed);

    const accessoriesGroup = this.repairForm.get('accessories') as FormGroup;
    const otherAccessories = repair.accessories.filter(accessory => accessory.startsWith('Other: '));
    const otherBatteries = repair.accessories.filter(accessory => accessory.startsWith('Battery (Other - specify): '));
    const selectedAccessories = repair.accessories.filter(accessory => !accessory.startsWith('Other: ') && !accessory.startsWith('Battery (Other - specify): '));

    accessoriesGroup.patchValue({
      selectedAccessories,
      otherAccessory: otherAccessories.length > 0 ? otherAccessories[0].replace('Other: ', '') : '',
      otherBattery: otherBatteries.length > 0 ? otherBatteries[0].replace('Battery (Other - specify): ', '') : ''
    });

    this.showOtherAccessory = accessoriesGroup.value.otherAccessory !== '';
    this.showOtherBattery = accessoriesGroup.value.otherBattery !== '';

  }

  /** User Interactions */

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

  handleOrgSelection(org: string): void {
    this.selectedOrg = org;
    this.repairForm.patchValue({ radioOrg: org });
  }

  handleLocSelection(loc: string): void {
    this.repairForm.patchValue({ radioLocation: loc });
  }

  updateRepair(): void {
    const submittedRepair: RepairFormFields = this.prepareRepairData();
    this.store.dispatch(editRepair({ id: this.repairID, updates: submittedRepair }));
  }

  /** Form Submission */

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
      radioID: this.radioId ?? this.repairForm.value.radioID,
      radioMake: this.repairForm.value.radioMake ?? '',
      radioSerial: this.repairForm.value.radioSerial ?? '',
      radioOrg: this.repairForm.value.radioOrg ?? '',
      radioLocation: this.repairForm.value.radioLocation ?? '',
      reportedBy: this.repairForm.value.reportedBy ?? '',
      endUserPO: this.repairForm.value.endUserPO ?? '',
      raaPO: this.repairForm.value.raaPO ?? '',
      repairTag: this.repairTag,
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

    console.log('partsUsedArray:', this.partsUsedArray.value);
    console.log('Submitted partsUsed:', filterEmptyArrayValues(this.partsUsedArray.value));

    this.accessControlService.restoreDisabledControls(this.repairForm, enabledControls);

    return repairData;
  }

  handleSubmission(formValue: any, oneRadio: any): void {
    const radioLocationControl = this.repairForm.get('radioLocation');
    const radioOrgControl = this.repairForm.get('radioOrg');

    let formRadioLocation = '';
    if (radioLocationControl?.disabled) {
      radioLocationControl.enable();
      formRadioLocation = radioLocationControl.value || '';
      radioLocationControl.disable();
    } else {
      formRadioLocation = formValue.radioLocation || '';
    }

    let formRadioOrg = '';
    if (radioOrgControl?.disabled) {
      radioOrgControl.enable();
      formRadioOrg = radioOrgControl.value || '';
      radioOrgControl.disable();
    } else {
      formRadioOrg = formValue.radioOrg || '';
    }

    const oneRadioLocationName = oneRadio?.locationName || '';
    const oneRadioOrgName = oneRadio?.orgName || '';
    const radioId = this.radioId || oneRadio?._id || formValue.radioID || '';

    if (formRadioLocation !== oneRadioLocationName || formRadioOrg !== oneRadioOrgName) {
      console.log(`formRadioLocation: ${formRadioLocation}, oneRadioLocationName: ${oneRadioLocationName}, radioId: ${radioId}`);
      this.mismatchModalService.openMismatchDialog(
        formRadioLocation,
        oneRadioLocationName,
        radioId,
        () => this.updateRepair()
      );
    } else {
      this.updateRepair();
    }
  }

  onSubmit() {
    this.subscriptions.add(
      of(this.repairForm.value).pipe(
        withLatestFrom(this.oneRadio$),
        first()
      ).subscribe(([formValue, oneRadio]) => {
        this.handleSubmission(formValue, oneRadio);
      })
    );
  }

}