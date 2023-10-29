import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { RadioService } from '@app/services/radios/radio.service';
import { ToastService } from '@app/services/toast/toast.service';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { addRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioLoadingSelector, radioErrorSelector } from '@app/_store/_radio-store/radio.selectors';

@Component({
  selector: 'app-admin-add-radio',
  templateUrl: './admin-add-radio.component.html',
  styleUrls: ['./admin-add-radio.component.css']
})
export class AdminAddRadioComponent implements OnInit{

  adminRadioForm = new FormGroup({
    orgName: new FormControl<string>(''),
    location: new FormControl<string>(''),
    dateSold: new FormControl<string>(''),
    dateEntered: new FormControl<string>(''),
    inventoryNumber: new FormControl<string>(''),
    make: new FormControl<string>(''),
    model: new FormControl<string>(''),
    progChannels: new FormControl<string>(''),
    notes: new FormArray( [new FormControl<string>('', { nonNullable: true})] ),
    serialNumber: new FormControl<string>(''),
    warranty: new FormControl<string>(''),
    refurb: new FormControl<boolean>(false, { nonNullable: true }),
    radioType: new FormControl<string>(''),
  })

  isSubmitted = false;

  get notesArray(): FormArray {
    return this.adminRadioForm.get('notes') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private radioService: RadioService,
    private router: Router,
    private toastService: ToastService,
    private store: Store<AppState>
  ) { }

  addNotes() {
    this.notesArray.push(new FormControl<string>('', { nonNullable: true}));
  }

  removeNotes(index: number) {
    this.notesArray.removeAt(index);
  }

  fieldValidCheck(field: string) {
    if (
      this.adminRadioForm.get(`${field}`)?.invalid &&
      this.adminRadioForm.get(`${field}`)?.dirty ||
      this.adminRadioForm.get(`${field}`)?.touched ||
      this.isSubmitted) {
        return true
      } else {
        return false
      }
  }


  ngOnInit(): void {
      
  }

  // onSubmit() {
    
  //   console.log(this.adminRadioForm.value)

  //   const orgName = this.adminRadioForm.value.orgName ?? '';
  //   const location = this.adminRadioForm.value.location ?? '';
  //   const dateSold = this.adminRadioForm.value.dateSold ?? '';
  //   const dateEntered = this.adminRadioForm.value.dateEntered ?? '';
  //   const inventoryNumber = this.adminRadioForm.value.inventoryNumber ?? '';
  //   const make = this.adminRadioForm.value.make ?? '';
  //   const model = this.adminRadioForm.value.model ?? '';
  //   const progChannels = this.adminRadioForm.value.progChannels ?? '';
  //   const notes = Array.isArray(this.adminRadioForm.value.notes) ? this.adminRadioForm.value.notes : [''];    
  //   const serialNumber = this.adminRadioForm.value.serialNumber ?? '';
  //   const warranty = this.adminRadioForm.value.warranty ?? '';
  //   const refurb = this.adminRadioForm.value.refurb ?? false;
  //   const radioType = this.adminRadioForm.value.radioType ?? '';

  //   this.radioService.addRadio(
  //     orgName,
  //     location,
  //     dateSold,
  //     dateEntered,
  //     inventoryNumber,
  //     make,
  //     model,
  //     progChannels,
  //     notes as string[],
  //     serialNumber,
  //     warranty,
  //     refurb as boolean,
  //     radioType

  //   )
  //     .subscribe({ next: (result) => {
  //       const newRadio = result.data?.addRadio ?? null;

  //       if(newRadio) {
  //         this.toastService.show('Radio added successfully!', {
  //           delay: 3000
  //         })
  //         this.router.navigate(['/one-radio', newRadio._id]);
  
  //         this.isSubmitted = true
  
  //       } else {
  //         this.router.navigate(['/'])
  
  //         this.isSubmitted = true
  
  //       }
  
  //     }, error: (error) => {
  //       console.error(error);
  
  //       this.toastService.show('Failed to submit radio. Please try again', {
  //         classname: 'bg-danger light-text',
  //         delay: 3000
  //       })
  
 
  //     }})


  // }

  onSubmit() {

    console.log(this.adminRadioForm.value)

    const orgName = this.adminRadioForm.value.orgName ?? '';
    const location = this.adminRadioForm.value.location ?? '';
    const dateSold = this.adminRadioForm.value.dateSold ?? '';
    const dateEntered = this.adminRadioForm.value.dateEntered ?? '';
    const inventoryNumber = this.adminRadioForm.value.inventoryNumber ?? '';
    const make = this.adminRadioForm.value.make ?? '';
    const model = this.adminRadioForm.value.model ?? '';
    const progChannels = this.adminRadioForm.value.progChannels ?? '';
    const notes = Array.isArray(this.adminRadioForm.value.notes) ? this.adminRadioForm.value.notes.map(note => note ?? '') : [''];    
    const serialNumber = this.adminRadioForm.value.serialNumber ?? '';
    const warranty = this.adminRadioForm.value.warranty ?? '';
    const refurb = this.adminRadioForm.value.refurb ?? false;
    const radioType = this.adminRadioForm.value.radioType ?? '';

    this.store.dispatch(
      addRadio({
          orgName,
          location,
          dateSold,
          dateEntered,
          inventoryNumber,
          make,
          model,
          progChannels,
          notes,
          serialNumber,
          warranty,
          refurb,
          radioType
        })
      
      )
  }
}
