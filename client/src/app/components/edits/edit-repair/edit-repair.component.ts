// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
// import { RepairService } from '@app/services/repairs/repair.service';
// import { Repair, UpdateRepairFields} from '@app/graphql/schemas/typeInterfaces';
// import { ToastService } from '@app/services/toast/toast.service';

// @Component({
//   selector: 'app-edit-repair',
//   templateUrl: './edit-repair.component.html',
//   styleUrls: ['./edit-repair.component.css']
// })
// export class EditRepairComponent implements OnInit {

//   repairID!: string;
//   repair!: Repair;
//   editRepairForm!: FormGroup;

//   get symptomsArray(): FormArray {
//     return this.editRepairForm.get('symptoms') as FormArray;
//   }

//   get accessoriesArray(): FormArray {
//     return this.editRepairForm.get('accessories') as FormArray;
//   }

//   get workPerformedArray(): FormArray {
//     return this.editRepairForm.get('workPerformed') as FormArray;
//   }

//   get partsUsedArray(): FormArray {
//     return this.editRepairForm.get('partsUsed') as FormArray;
//   }

//   constructor(
//     private formBuilder: FormBuilder,
//     private repairService: RepairService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private toastService: ToastService
//     ) { }


//   loadRepair(id: string): void {
//     this.repairService.querySingleRepair(id)
//     .subscribe(( { data }) => {
//       console.log(data)
//       this.repair = data.repair;
//       this.populateForm();
//     })
//   }

//   populateForm() {

//     this.editRepairForm.patchValue({
//       radioID: this.repair.radioID,
//       dateReceived: new Date(parseInt(this.repair.dateReceived)),
//       endUserPO: this.repair.endUserPO,
//       raaPO: this.repair.raaPO,
//       dateSentTech: new Date(parseInt(this.repair.dateSentTech)),
//       dateRecTech: new Date(parseInt(this.repair.dateRecTech)),
//       dateSentEU: new Date(parseInt(this.repair.dateSentEU)),
//       techInvNum: this.repair.techInvNum,
//       raaInvNum: this.repair.raaInvNum,
//       testFreq: this.repair.testFreq,
//       incRxSens: this.repair.incRxSens,
//       incFreqErr: this.repair.incFreqErr,
//       incMod: this.repair.incMod,
//       incPowerOut: this.repair.incPowerOut,
//       outRxSens: this.repair.outRxSens,
//       outFreqErr: this.repair.outFreqErr,
//       outMod: this.repair.outMod,
//       outPowerOut: this.repair.outPowerOut,
//       repHours: this.repair.repHours,
//       remarks: this.repair.remarks

//     })

//     this.repair.symptoms.forEach(symptom => {
//       (this.editRepairForm.get('symptoms') as FormArray).push(this.formBuilder.control(symptom));
//     });

//     this.repair.accessories.forEach(accessory => {
//       (this.editRepairForm.get('accessories') as FormArray).push(this.formBuilder.control(accessory));
//     });
//     this.repair.workPerformed.forEach(work => {
//       (this.editRepairForm.get('workPerformed') as FormArray).push(this.formBuilder.control(work));
//     });
//     this.repair.partsUsed.forEach(part => {
//       (this.editRepairForm.get('partsUsed') as FormArray).push(this.formBuilder.control(part));
//     });
//   }

//   addSymptom() {
//     this.symptomsArray.push(this.formBuilder.control(''));
//   }

//   removeSymptom(index: number) {
//     this.symptomsArray.removeAt(index);
//   }


//   addAccessory() {
//     console.log('accessory click')
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


//   updateRepair(updateRepair: UpdateRepairFields): void {
//     this.repairService.editRepair(this.repairID, updateRepair).subscribe( { next: (result) => {
//       const editedRepair = result.data?.editRepair ?? null;

//       if(editedRepair) {
//         this.toastService.show('Repair Edited successfully!', {
//           delay: 3000
//         })

//         this.router.navigate(['/one-repair', editedRepair._id]);

//         // this.isSubmitted = true 
//       } else {
//         this.router.navigate(['/'])

//         // this.isSubmitted = true 

//       }

//     }, error: (error) => {
//       console.error(error);

//       this.toastService.show('Failed to edit repair. Please Try again', {
//         delay: 3000
//       })
//     }
  
//     });

//   }

//   onSubmit() {

//     console.log(this.editRepairForm.value)

//     // const formattedDates = {
//     //   fDateReceived: new Date(this.editRepairForm.value.dateReceived),
//     //   fDateSentTech: new Date(this.editRepairForm.value.dateSentTech),
//     //   fDateRecTech: new Date(this.editRepairForm.value.dateRecTech),
//     //   fDateSentEU: new Date(this.editRepairForm.value.dateSentEU),
//     // }

//     // console.log(formattedDates)

//     const submittedRepair: UpdateRepairFields = {
//       radioID: this.editRepairForm.value.radioID,
//       // TODO: Add in radioMake, radioSerial
//       radioLocation: this.editRepairForm.value.radioLocation,
//       dateReceived: this.editRepairForm.value.dateReceived,
//       endUserPO: this.editRepairForm.value.endUserPO,
//       raaPO: this.editRepairForm.value.raaPO,
//       repairTag: this.repair.repairTag,
//       dateSentTech: this.editRepairForm.value.dateSentTech,
//       dateRecTech: this.editRepairForm.value.dateRecTech,
//       dateSentEU: this.editRepairForm.value.dateSentEU,
//       techInvNum: this.editRepairForm.value.techInvNum,
//       raaInvNum: this.editRepairForm.value.raaInvNum,
//       symptoms: Array.isArray(this.editRepairForm.value.symptoms) ? this.editRepairForm.value.symptoms : [''],
//       testFreq: this.editRepairForm.value.testFreq,
//       incRxSens: this.editRepairForm.value.incRxSens,
//       incFreqErr: this.editRepairForm.value.incFreqErr,
//       incMod: this.editRepairForm.value.incMod,
//       incPowerOut: this.editRepairForm.value.incPowerOut,
//       outRxSens: this.editRepairForm.value.outRxSens,
//       outFreqErr: this.editRepairForm.value.outFreqErr,
//       outMod: this.editRepairForm.value.outMod,
//       outPowerOut: this.editRepairForm.value.outPowerOut,
//       accessories: Array.isArray(this.editRepairForm.value.accessories) ? this.editRepairForm.value.accessories : [''],
//       workPerformed: Array.isArray(this.editRepairForm.value.workPerformed) ? this.editRepairForm.value.workPerformed : [''],
//       repHours: this.editRepairForm.value.repHours,
//       partsUsed: Array.isArray(this.editRepairForm.value.partsUsed) ? this.editRepairForm.value.partsUsed : [''],
//       remarks: this.editRepairForm.value.remarks,
//     };

//     this.updateRepair(submittedRepair);
//   }

//   ngOnInit(): void {
//     this.editRepairForm = this.formBuilder.group({
//       radioID: '',
//       dateReceived: new FormControl(new Date()),
//       endUserPO: '',
//       raaPO: '',
//       dateSentTech: new FormControl(new Date()),
//       dateRecTech: new FormControl(new Date()),
//       dateSentEU: new FormControl(new Date()),
//       techInvNum: '',
//       raaInvNum: '',
//       symptoms: this.formBuilder.array([]),
//       testFreq: '',
//       incRxSens: '',
//       incFreqErr: '',
//       incMod: '',
//       incPowerOut: '',
//       outRxSens: '',
//       outFreqErr: '',
//       outMod: '',
//       outPowerOut: '',
//       accessories: this.formBuilder.array([]),
//       workPerformed: this.formBuilder.array([]),
//       repHours: 0,
//       partsUsed: this.formBuilder.array([]),
//       remarks: ''

//     })

//     this.activatedRoute.params.subscribe((params: Params) => {
//       this.repairID = params['id'];
//       this.loadRepair(this.repairID);
//     })
//   };

// }
