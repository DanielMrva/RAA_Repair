import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
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

  adminRepairForm = this.formBuilder.group({
    radioSerial: '',
    dateReceived: '',
    endUserPO: '',
    raaPO: '',
    repairTag: '',
    dateSentTech: '',
    dateSentEU: '',
    techInvNum: '',
    raaInvNum: '',
    symptoms: '',
    testFreq: '',
    incRxSens: '',
    incFreqErr: '',
    incMod: '',
    incPowerOut: '',
    outFreqErr: '',
    outMod: '',
    outPowerOut: '',
    accessories: [''],
    workPerformed: [''],
    repHours: '',
    partsUsed: [''],
    remarks: ''
    
  })
  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private toastService: ToastService
  ) {}


  ngOnInit(): void {
      
  }

  onSubmit() {



    this.apollo.mutate<{ addRepair: Repair}>({
      mutation: ADD_REPAIR,
      variables: {
        radioSerial: this.adminRepairForm.value.radioSerial,
        dateReceived: this.adminRepairForm.value.dateReceived,
        endUserPO: this.adminRepairForm.value.endUserPO,
        raaPO: this.adminRepairForm.value.raaPO,
        repairTag: this.adminRepairForm.value.repairTag,
        dateSentTech: this.adminRepairForm.value.dateSentTech,
        dateSentEU: this.adminRepairForm.value.dateSentEU,
        techInvNum: this.adminRepairForm.value.techInvNum,
        raaInvNum: this.adminRepairForm.value.raaInvNum,
        symptoms: this.adminRepairForm.value.symptoms,
        testFreq: this.adminRepairForm.value.testFreq,
        incRxSens: this.adminRepairForm.value.incRxSens,
        incFreqErr: this.adminRepairForm.value.incFreqErr,
        incMod: this.adminRepairForm.value.incMod,
        incPowerOut: this.adminRepairForm.value.incPowerOut,
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

      const newRepair = result.data?.addRepair
      console.log(newRepair);


      if(newRepair) {
        this.toastService.show('Repair added sucessfully!', {
          classname: 'bg-sucess text-light',
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
