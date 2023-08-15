import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { RepairService } from '@app/services/repairs/repair.service';
import { Repair} from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.css']
})
export class EditRepairComponent implements OnInit {

  repairId!: string;
  repair!: Repair;
  editRepairForm!: FormGroup;

  get symptomsArray(): FormArray {
    return this.editRepairForm.get('symptoms') as FormArray;
  }

  get accessoriesArray(): FormArray {
    return this.editRepairForm.get('accessories') as FormArray;
  }

  get workPerformedArray(): FormArray {
    return this.editRepairForm.get('workPerformed') as FormArray;
  }

  get partsUsedArray(): FormArray {
    return this.editRepairForm.get('partsUsed') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private repairService: RepairService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
    ) { }


  loadRepair(id: string): void {
    this.repairService.querySingleRepair(id)
    .subscribe(( { data }) => {
      console.log(data)
      this.repair = data.repair;
      this.editRepairForm.patchValue(data.repair);
    })
  }

  addSymptom() {
    this.symptomsArray.push(this.formBuilder.control(''));
  }

  removeSymptom(index: number) {
    this.symptomsArray.removeAt(index);
  }

  addAccessory() {
    this.accessoriesArray.push(this.formBuilder.control(''));
  }

  removeAccessory(index: number) {
    this.accessoriesArray.removeAt(index);
  }

  addWorkPerformed() {
    this.workPerformedArray.push(this.formBuilder.control(''));
  }

  removeWorkPerformed(index: number) {
    this.workPerformedArray.removeAt(index);
  }

  addPartsUsed() {
    this.partsUsedArray.push(this.formBuilder.control(''));
  }

  removePartsUsed(index: number) {
    this.partsUsedArray.removeAt(index);
  }


  updateRepair(updateRepair: Repair): void {
    this.repairService.editRepair(this.repairId, updateRepair).subscribe(() => {

    })
  }

  ngOnInit(): void {
    this.editRepairForm = this.formBuilder.group({
      radioSerial: '',
      dateReceived: '',
      endUserPO: '',
      raaPO: '',
      dateSentTech: '',
      dateRecTech: '',
      dateSentEU: '',
      techInvNum: '',
      raaInvNum: '',
      symptoms: this.formBuilder.array(['']),
      testFreq: '',
      incRxSens: '',
      incFreqErr: '',
      incMod: '',
      incPowerOut: '',
      outRxSens: '',
      outFreqErr: '',
      outMod: '',
      outPowerOut: '',
      accessories: this.formBuilder.array(['']),
      workPerformed: this.formBuilder.array(['']),
      repHours: 0,
      partsUsed: this.formBuilder.array(['']),
      remarks: ''

    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.repairId = params['id'];
      this.loadRepair(this.repairId);
    })
  }






}
