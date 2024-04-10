import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RadioService } from '@app/services/radios/radio.service';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-admin-radio',
  templateUrl: './admin-radio.component.html',
  styleUrls: ['./admin-radio.component.css']
})
export class AdminRadioComponent implements OnInit {

  adminRadioForm = this.formBuilder.group({
    orgName: ['', [Validators.required]],
    location: '',
    datePurchased: '',
    dateEntered: '',
    inventoryNumber: ['', [Validators.required]],
    make: ['', [Validators.required]],
    model: ['', [Validators.required]],
    progChannels: '',
    notes: this.formBuilder.array(['']),
    serialNumber: ['', [Validators.required]],
    warranty: '',
    refurb: this.formBuilder.control('refurb'), 
    // refurb is a radio button on the HTML
    radioType: this.formBuilder.control('radioType'),
    // radioType is a radio button on the HTML
  })

  isSubmitted = false;

  get notesArray(): FormArray {
    return this.adminRadioForm.get('notes') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private radioService: RadioService,
    private router: Router,
    private toastService: ToastService
  ) { }

  addNotes() {
    this.notesArray.push(this.formBuilder.control(''));
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

  onSubmit() {
    
    console.log(this.adminRadioForm.value)

    const orgName = this.adminRadioForm.value.orgName ?? '';
    const location = this.adminRadioForm.value.location ?? '';
    const datePurchased = this.adminRadioForm.value.datePurchased ?? '';
    const dateEntered = this.adminRadioForm.value.dateEntered ?? '';
    const inventoryNumber = this.adminRadioForm.value.inventoryNumber ?? '';
    const make = this.adminRadioForm.value.make ?? '';
    const model = this.adminRadioForm.value.model ?? '';
    const progChannels = this.adminRadioForm.value.progChannels ?? '';
    const notes = Array.isArray(this.adminRadioForm.value.notes) ? this.adminRadioForm.value.notes : [''];    
    const serialNumber = this.adminRadioForm.value.serialNumber ?? '';
    const warranty = this.adminRadioForm.value.warranty ?? '';
    const refurb = this.adminRadioForm.value.refurb ?? false;
    const radioType = this.adminRadioForm.value.radioType ?? '';

    this.radioService.addRadio(
      orgName,
      location,
      datePurchased,
      dateEntered,
      inventoryNumber,
      make,
      model,
      progChannels,
      notes as string[],
      serialNumber,
      warranty,
      refurb as boolean,
      radioType

    )
      .subscribe({ next: (result) => {
        const newRadio = result.data?.addRadio ?? null;

        if(newRadio) {
          this.toastService.show('Radio added successfully!', {
            delay: 3000
          })
          this.router.navigate(['/one-radio', newRadio._id]);
  
          this.isSubmitted = true
  
        } else {
          this.router.navigate(['/'])
  
          this.isSubmitted = true
  
        }
  
      }, error: (error) => {
        console.error(error);
  
        this.toastService.show('Failed to submit radio. Please try again', {
          classname: 'bg-danger light-text',
          delay: 3000
        })
  
 
      }})


  }
}
