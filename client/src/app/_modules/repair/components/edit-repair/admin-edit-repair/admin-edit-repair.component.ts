import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Repair, RepairFormFields } from '@app/graphql/schemas/typeInterfaces';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editRepair, loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';
import { radioErrorSelector, radioLoadingSelector, selectOneRadio } from '@app/_store/_radio-store/radio.selectors';
import { loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { MismatchModalService } from '@app/services/modal/mismatch-modal.service';
import { first, of, withLatestFrom } from 'rxjs';



@Component({
  selector: 'app-admin-edit-repair',
  templateUrl: './admin-edit-repair.component.html',
  styleUrls: ['./admin-edit-repair.component.css']
})
export class AdminEditRepairComponent implements OnInit {

  oneRadio$
  radioError$
  radioIsLoading$
  isLoading$
  repairError$
  oneRepair$

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

  initialOrgName: string | null = null;

  filteredLocationNames: string[] = [];


  repairID!: string;
  radioId!: string;
  repairTag!: number;

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
    orgName: new FormControl<string>('')
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

    this.store.dispatch(loadOneRepair({ repairID: id }))
  }

  populateForm() {

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairForm.patchValue({
          radioID: repair.radioID,
          radioMake: repair.radioMake,
          radioSerial: repair.radioSerial,
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



  ngOnInit(): void {

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

    this.activatedRoute.paramMap.subscribe(params => {
      const repairID = params.get('id');
      if (repairID) {
        this.loadRepair(repairID);
        this.oneRepair$.subscribe(repair => {
          if (repair) {
            this.store.dispatch(loadOneRadio({radioID: repair.radioID}));
          }
          this.oneRadio$.subscribe(radio => {
            if(radio) {
              this.initialOrgName = radio.orgName;
              this.radioId = radio._id;
              this.initialOrgName = radio.orgName;
            }
          })
        })
      }
    })

    this.populateForm();

  };

  handleOrgNameSelected(orgName: string): void {
    this.repairForm.patchValue({ orgName });
  }

  handleFilteredLocations(locations: string[]): void {
    this.filteredLocationNames = locations;
  }

  updateRepair(): void {

    console.log(this.repairForm.value)


    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairTag = repair.repairTag;
        this.repairID = repair._id
      }
    })

    const submittedRepair: RepairFormFields = {
      radioID: this.radioId ?? this.repairForm.value.radioID,
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


    this.store.dispatch(editRepair({ id: this.repairID, updates: submittedRepair }))

  };

  onSubmit() {

    of(this.repairForm.value).pipe(
      withLatestFrom(this.oneRadio$),
      first(),
    ).subscribe(([formValue, oneRadio]) => {
      const formRadioLocation = formValue.radioLocation || '';
      const oneRadioLocationName = oneRadio?.locationName || '';
      const radioId = this.radioId || oneRadio?._id || formValue.radioID || '';

      if (formRadioLocation !== oneRadioLocationName) {
        console.log(`formRadioLocation: ${formRadioLocation}, oneRadioLocationName: ${oneRadioLocationName}, radioId: ${radioId}`)
        this.mismatchModalService.openMismatchDialog(
          formRadioLocation,
          oneRadioLocationName,
          radioId,
          () => this.updateRepair()
        )
      } else {
        this.updateRepair()
      }
    });
  }


}
