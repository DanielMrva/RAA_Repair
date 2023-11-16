import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { RepairService } from '@app/services/repairs/repair.service';
import { Repair, UpdateRepairFields} from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { editRepair, loadOneRepair } from '@app/_store/_repair-store/repair.actions';
import { selectOneRepair, repairErrorSelector, repairLoadingSelector } from '@app/_store/_repair-store/repair.selectors';


@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.css']
})
export class EditRepairComponent implements OnInit {

  repairForm = new FormGroup({
    radioSerial: new FormControl<string>(''),
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

  isLoading$ = this.store.select(repairLoadingSelector);
  repairError$ = this.store.select(repairErrorSelector);
  oneRepair$ = this.store.select(selectOneRepair);

  repairId!: string;
  repairTag!: number;

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
    ) { }


  loadRepair(id: string): void {

    this.store.dispatch(loadOneRepair({repairId: id}))
  }

  populateForm() {

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairForm.patchValue({
          radioSerial: repair.radioSerial,
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
    this.symptomsArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  };


  addAccessory() {
    console.log('accessory click')
    this.accessoriesArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
  };

  addWorkPerformed() {
    this.workPerformedArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removeWorkPerformed(index: number) {
    this.workPerformedArray.removeAt(index);
  };

  addPartsUsed() {
    this.partsUsedArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removePartsUsed(index: number) {
    this.partsUsedArray.removeAt(index);
  };


  updateRepair(updateRepair: UpdateRepairFields): void {

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairId = repair._id;
      }

    })

    this.store.dispatch(editRepair({id: this.repairId, updates: updateRepair}))

  };

  onSubmit() {

    console.log(this.repairForm.value)

    this.oneRepair$.subscribe((repair: Repair | null) => {
      if (repair) {
        this.repairTag = repair.repairTag;
      }
    })

    const submittedRepair: UpdateRepairFields = {
      radioSerial: this.repairForm.value.radioSerial ?? '',
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
    this.repairForm.patchValue({
      radioSerial: '',
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

    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.repairId = params['id'];
      this.loadRepair(this.repairId);
    })

    this.populateForm();
  };

}
