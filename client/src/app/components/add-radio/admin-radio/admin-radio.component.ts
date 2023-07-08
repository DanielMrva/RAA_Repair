import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ADD_RADIO } from '@app/graphql/schemas';
import { Apollo } from 'apollo-angular';
import { Radio } from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-admin-radio',
  templateUrl: './admin-radio.component.html',
  styleUrls: ['./admin-radio.component.css']
})
export class AdminRadioComponent implements OnInit {

  adminRadioForm = this.formBuilder.group({
    orgName: ['', [Validators.required]],
    location: '',
    dateSold: '',
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
    private apollo: Apollo,
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

    this.apollo.mutate<any>({
      mutation: ADD_RADIO,
      variables: {
        orgName: this.adminRadioForm.value.orgName,
        dateSold: this.adminRadioForm.value.dateSold,
        dateEntered: this.adminRadioForm.value.dateEntered,
        inventoryNumber: this.adminRadioForm.value.inventoryNumber,
        make: this.adminRadioForm.value.make,
        model: this.adminRadioForm.value.model,
        progChannels: this.adminRadioForm.value.progChannels,
        notes: this.adminRadioForm.value.notes,
        serialNumber: this.adminRadioForm.value.serialNumber,
        warranty: this.adminRadioForm.value.warranty,
        refurb: this.adminRadioForm.value.refurb,
        radioType: this.adminRadioForm.value.radioType
      }
    }) .subscribe({ next: (result) => {

      const newRadio = result.data?.addRadio ?? null;

      if(newRadio) {
        this.toastService.show('Radio added sucessfully!', {
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

    }});

  }
}
