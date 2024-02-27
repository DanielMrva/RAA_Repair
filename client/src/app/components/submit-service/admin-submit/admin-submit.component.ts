// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// import { RepairService } from '@app/services/repairs/repair.service';
// import { Repair } from '@app/graphql/schemas/typeInterfaces';
// import { ToastService } from '@app/services/toast/toast.service';

// @Component({
//   selector: 'app-admin-submit',
//   templateUrl: './admin-submit.component.html',
//   styleUrls: ['./admin-submit.component.css']
// })

// export class AdminSubmitComponent implements OnInit{

//   adminRepairForm = this.formBuilder.group({
    
//     radioID: '',
//     dateReceived: '',
//     endUserPO: '',
//     raaPO: '',
//     dateSentTech: '',
//     dateRecTech: '',
//     dateSentEU: '',
//     techInvNum: '',
//     raaInvNum: '',
//     symptoms: this.formBuilder.array(['']),
//     testFreq: '',
//     incRxSens: '',
//     incFreqErr: '',
//     incMod: '',
//     incPowerOut: '',
//     outRxSens: '',
//     outFreqErr: '',
//     outMod: '',
//     outPowerOut: '',
//     accessories: this.formBuilder.array(['']),
//     workPerformed: this.formBuilder.array(['']),
//     repHours: 0,
//     partsUsed: this.formBuilder.array(['']),
//     remarks: ''
    
  
//   })

//   get symptomsArray(): FormArray {
//     return this.adminRepairForm.get('symptoms') as FormArray;
//   }

//   get accessoriesArray(): FormArray {
//     return this.adminRepairForm.get('accessories') as FormArray;
//   }

//   get workPerformedArray(): FormArray {
//     return this.adminRepairForm.get('workPerformed') as FormArray;
//   }

//   get partsUsedArray(): FormArray {
//     return this.adminRepairForm.get('partsUsed') as FormArray;
//   }


//   constructor(
//     private formBuilder: FormBuilder,
//     private repairService: RepairService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private toastService: ToastService
//   ) {  }

//   addSymptom() {
//     this.symptomsArray.push(this.formBuilder.control(''));
//   }

//   removeSymptom(index: number) {
//     this.symptomsArray.removeAt(index);
//   }

//   addAccessory() {
//     this.accessoriesArray.push(this.formBuilder.control(''));
//   }

//   removeAccessory(index: number) {
//     this.accessoriesArray.removeAt(index);
//   }

//   addWorkPerformed() {
//     this.workPerformedArray.push(this.formBuilder.control(''));
//   }

//   removeWorkPerformed(index: number) {
//     this.workPerformedArray.removeAt(index);
//   }

//   addPartsUsed() {
//     this.partsUsedArray.push(this.formBuilder.control(''));
//   }

//   removePartsUsed(index: number) {
//     this.partsUsedArray.removeAt(index);
//   }

//   ngOnInit(): void {

//     this.activatedRoute.paramMap.subscribe(params => {
//       const serialNumber = params.get('serialNumber');
//       if (serialNumber) {
//         this.adminRepairForm.patchValue({ radioID: serialNumber })
//       }
//     })
//   }

//   onSubmit() {

//     // console.log(this.adminRepairForm.value);


//     const radioID = this.adminRepairForm.value.radioID ?? '';
//     const dateReceived = this.adminRepairForm.value.dateReceived ?? '';
//     const endUserPO = this.adminRepairForm.value.endUserPO  ?? '';
//     const raaPO = this.adminRepairForm.value.raaPO  ?? '';
//     const dateSentTech = this.adminRepairForm.value.dateSentTech ?? '';
//     const dateRecTech = this.adminRepairForm.value.dateRecTech ?? '';
//     const dateSentEU = this.adminRepairForm.value.dateSentEU ?? '';
//     const techInvNum = this.adminRepairForm.value.techInvNum ?? '';
//     const raaInvNum = this.adminRepairForm.value.raaInvNum ?? '';
//     const symptoms = Array.isArray(this.adminRepairForm.value.symptoms) ? this.adminRepairForm.value.symptoms : ['']; 
//     const testFreq = this.adminRepairForm.value.testFreq ?? '';
//     const incRxSens = this.adminRepairForm.value.incRxSens ?? '';
//     const incFreqErr = this.adminRepairForm.value.incFreqErr ?? '';
//     const incMod = this.adminRepairForm.value.incMod ?? '';
//     const incPowerOut = this.adminRepairForm.value.incPowerOut ?? '';
//     const outRxSens = this.adminRepairForm.value.outRxSens ?? '';
//     const outFreqErr = this.adminRepairForm.value.outFreqErr ?? '';
//     const outMod = this.adminRepairForm.value.outMod  ?? '';
//     const outPowerOut = this.adminRepairForm.value.outPowerOut ?? '';
//     const accessories = Array.isArray(this.adminRepairForm.value.accessories) ? this.adminRepairForm.value.accessories : [''];
//     const workPerformed = Array.isArray(this.adminRepairForm.value.workPerformed) ? this.adminRepairForm.value.workPerformed : ['']; 
//     const repHours = this.adminRepairForm.value.repHours  ?? 0;
//     const partsUsed = Array.isArray(this.adminRepairForm.value.partsUsed) ? this.adminRepairForm.value.partsUsed : [''];
//     const remarks = this.adminRepairForm.value.remarks ?? '';

//     this.repairService.addRepair(
//       radioID,
//       dateReceived,
//       endUserPO,
//       raaPO,
//       dateSentTech,
//       dateRecTech,
//       dateSentEU,
//       techInvNum,
//       raaInvNum,
//       symptoms as string[],
//       testFreq,
//       incRxSens,
//       incFreqErr,
//       incMod,
//       incPowerOut,
//       outRxSens,
//       outFreqErr,
//       outMod,
//       outPowerOut,
//       accessories as string[],
//       workPerformed as string[],
//       repHours,
//       partsUsed as string[],
//       remarks
//     ) 
    
//     .subscribe({ next: (result) => {

//       const newRepair = result.data?.addRepair ?? null;
//       // console.log(newRepair);


//       if(newRepair) {
//         this.toastService.show('Repair added successfully!', {
//           classname: 'bg-success text-light',
//           delay: 3000
//         })
//         this.router.navigate(['/one-repair', newRepair._id]);
//       } else {
//         this.router.navigate(['/']);

//       }
//     }, error: (error) => {
//       console.error(error);

//       this.toastService.show('Failed to submit repair. Please try again', {
//         classname: 'bg-danger text-light',
//         delay: 3000
//       })
//     }});
//   }
// }
