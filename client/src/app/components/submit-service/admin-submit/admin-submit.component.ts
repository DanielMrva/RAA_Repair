import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ADD_REPAIR } from '@app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { Repair } from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-admin-submit',
  templateUrl: './admin-submit.component.html',
  styleUrls: ['./admin-submit.component.css']
})

export class AdminSubmitComponent implements OnInit{



  // adminRepairForm: FormGroup;

  adminRepairForm = this.formBuilder.group({
    
    radioSerial: '',
    dateReceived: '',
    endUserPO: '',
    raaPO: '',
    repairTag: '',
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
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private toastService: ToastService
  ) {  }

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

  ngOnInit(): void {
      
  }

  onSubmit() {

    // console.log(this.adminRepairForm.value);



    this.apollo.mutate<any>({
      mutation: ADD_REPAIR,
      variables: {
        radioSerial: this.adminRepairForm.value.radioSerial,
        dateReceived: this.adminRepairForm.value.dateReceived,
        endUserPO: this.adminRepairForm.value.endUserPO,
        raaPO: this.adminRepairForm.value.raaPO,
        repairTag: this.adminRepairForm.value.repairTag,
        dateSentTech: this.adminRepairForm.value.dateSentTech,
        dateRecTech: this.adminRepairForm.value.dateRecTech,
        dateSentEU: this.adminRepairForm.value.dateSentEU,
        techInvNum: this.adminRepairForm.value.techInvNum,
        raaInvNum: this.adminRepairForm.value.raaInvNum,
        symptoms: this.adminRepairForm.value.symptoms,
        testFreq: this.adminRepairForm.value.testFreq,
        incRxSens: this.adminRepairForm.value.incRxSens,
        incFreqErr: this.adminRepairForm.value.incFreqErr,
        incMod: this.adminRepairForm.value.incMod,
        incPowerOut: this.adminRepairForm.value.incPowerOut,
        outRxSens: this.adminRepairForm.value.outRxSens,
        outFreqErr: this.adminRepairForm.value.outFreqErr,
        outMod: this.adminRepairForm.value.outMod,
        outPowerOut: this.adminRepairForm.value.outPowerOut,
        accessories: this.adminRepairForm.value.accessories,
        workPerformed: this.adminRepairForm.value.workPerformed,
        repHours: this.adminRepairForm.value.repHours,
        partsUsed: this.adminRepairForm.value.partsUsed,
        remarks: this.adminRepairForm.value.remarks
      }
    }) .subscribe({ next: (result) => {

      const newRepair = result.data?.addRepair ?? null;
      // console.log(newRepair);


      if(newRepair) {
        this.toastService.show('Repair added sucessfully!', {
          classname: 'bg-success text-light',
          delay: 3000
        })
        this.router.navigate(['/one-repair', newRepair._id]);
      } else {
        this.router.navigate(['/']);

      }
    }, error: (error) => {
      console.error(error);

      this.toastService.show('Failed to submit repair. Please try again', {
        classname: 'bg-danger text-light',
        delay: 3000
      })
    }});
  }
}
