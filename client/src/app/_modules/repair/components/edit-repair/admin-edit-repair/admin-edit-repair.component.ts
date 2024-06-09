import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Radio, Repair, RepairFormFields } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editRepair, loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { MismatchModalService } from '@app/services/modal/mismatch-modal.service';
import { first, of, withLatestFrom, Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-admin-edit-repair',
  templateUrl: './admin-edit-repair.component.html',
  styleUrls: ['./admin-edit-repair.component.css']
})
export class AdminEditRepairComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  oneRadio$;
  radioError$;
  radioIsLoading$;
  isLoading$;
  repairError$;
  oneRepair$;

  initialOrgName: string | null = null;
  filteredLocationNames: string[] = [];

  repairID!: string;
  radioId!: string;
  repairTag!: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private mismatchModalService: MismatchModalService
  ) {
    this.oneRadio$ = this.store.select(selectOneRadio);
    this.radioError$ = this.store.select(radioErrorSelector);
    this.radioIsLoading$ = this.store.select(radioLoadingSelector);
    this.isLoading$ = this.store.select(repairLoadingSelector);
    this.repairError$ = this.store.select(repairErrorSelector);
    this.oneRepair$ = this.store.select(selectOneRepair);
  }

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
                this.initialOrgName = radio.orgName;
                this.radioId = radio._id;
                this.populateForm(repair, radio);
              }
            })
          );
        }
      })
    );
  }

  repairForm = new FormGroup({
    radioID: new FormControl<string>(''),
    radioMake: new FormControl<string>(''),
    radioSerial: new FormControl<string>(''),
    radioLocation: new FormControl<string>(''),
    endUserPO: new FormControl<string>(''),
    raaPO: new FormControl<string>(''),
    repairStatus: new FormControl<string>(''),
    dateRepairAdded: new FormControl<Date>(new Date()),
    dateSentEuRaa: new FormControl<Date>(new Date()),
    dateRecEuRaa: new FormControl<Date>(new Date()),
    dateSentRaaTech: new FormControl<Date>(new Date()),
    dateRecTechRaa: new FormControl<Date>(new Date()),
    dateSentRaaEu: new FormControl<Date>(new Date()),
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

  loadRepair(id: string): void {
    this.store.dispatch(loadOneRepair({ repairID: id }));
  }

  populateForm(repair: Repair, radio: Radio) {
    this.repairForm.patchValue({
      radioID: repair.radioID,
      radioMake: repair.radioMake,
      radioSerial: repair.radioSerial,
      radioLocation: repair.radioLocation,
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
      orgName: radio.orgName
    });

    // Insert existing symptoms at the beginning
    repair.symptoms.forEach((symptom, index) => {
      (this.repairForm.get('symptoms') as FormArray).insert(index, this.formBuilder.control(symptom));
    });

    // Insert existing accessories at the beginning
    repair.accessories.forEach((accessory, index) => {
      (this.repairForm.get('accessories') as FormArray).insert(index, this.formBuilder.control(accessory));
    });

    // Insert existing work performed at the beginning
    repair.workPerformed.forEach((work, index) => {
      (this.repairForm.get('workPerformed') as FormArray).insert(index, this.formBuilder.control(work));
    });

    // Insert existing parts used at the beginning
    repair.partsUsed.forEach((part, index) => {
      (this.repairForm.get('partsUsed') as FormArray).insert(index, this.formBuilder.control(part));
    });
  }

  addSymptom() {
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true }));
  }

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  }

  addAccessory() {
    this.accessoriesArray.push(new FormControl<string>('', { nonNullable: true }));
  }

  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
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

  handleOrgNameSelected(orgName: string): void {
    this.repairForm.patchValue({ orgName });
  }

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocationNames = locations;
  }

  updateRepair(): void {
    const submittedRepair: RepairFormFields = this.prepareRepairData();
    this.store.dispatch(editRepair({ id: this.repairID, updates: submittedRepair }));
  }

  prepareRepairData(): RepairFormFields {
    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairTag = repair.repairTag;
        this.repairID = repair._id;
      }
    });

    return {
      radioID: this.radioId ?? this.repairForm.value.radioID,
      radioMake: this.repairForm.value.radioMake ?? '',
      radioSerial: this.repairForm.value.radioSerial ?? '',
      radioLocation: this.repairForm.value.radioLocation ?? '',
      endUserPO: this.repairForm.value.endUserPO ?? '',
      raaPO: this.repairForm.value.raaPO ?? '',
      repairTag: this.repairTag,
      repairStatus: this.repairForm.value.repairStatus ?? '',
      dateRepairAdded: this.repairForm.value.dateRepairAdded ?? new Date(),
      dateSentEuRaa: this.repairForm.value.dateSentEuRaa ?? new Date(),
      dateRecEuRaa: this.repairForm.value.dateRecEuRaa ?? new Date(),
      dateSentRaaTech: this.repairForm.value.dateSentRaaTech ?? new Date(),
      dateRecTechRaa: this.repairForm.value.dateRecTechRaa ?? new Date(),
      dateSentRaaEu: this.repairForm.value.dateSentRaaEu ?? new Date(),
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
      remarks: this.repairForm.value.remarks ?? ''
    };
  }

  handleSubmission(formValue: any, oneRadio: any): void {
    const formRadioLocation = formValue.radioLocation || '';
    const oneRadioLocationName = oneRadio?.locationName || '';
    const radioId = this.radioId || oneRadio?._id || formValue.radioID || '';

    if (formRadioLocation !== oneRadioLocationName) {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
