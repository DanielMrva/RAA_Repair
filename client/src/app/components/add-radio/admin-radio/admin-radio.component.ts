import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
    orgName: '',
    location: '',
    dateSold: '',
    dateEntered: '',
    inventoryNumber: '',
    make: '',
    model: '',
    progChannels: '',
    notes: this.formBuilder.array(['']),
    serialNumber: '',
    warranty: '',
    refurb: this.formBuilder.control('refurb'),
    radioType: this.formBuilder.control('radioType'),
  })

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


  ngOnInit(): void {
      
  }

  onSubmit() {
    
    console.log(this.adminRadioForm.value);

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

      console.log(newRadio);

      if(newRadio) {
        this.toastService.show('Radio added sucessfully!', {
          delay: 3000
        })
        // this.router.navigate(['one-radio', newRadio._id]);
        this.router.navigate(['/'])

      } else {
        this.router.navigate(['/'])
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
