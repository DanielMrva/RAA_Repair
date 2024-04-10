import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl, Form} from '@angular/forms';
import { RadioService } from '@app/services/radios/radio.service';
import { Radio, UpdateRadioFields } from '@app/graphql/schemas/typeInterfaces';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'app-edit-radio',
  templateUrl: './edit-radio.component.html',
  styleUrls: ['./edit-radio.component.css']
})
export class EditRadioComponent implements OnInit {

  radioID!: string;
  radio!: Radio;
  editRadioForm!: FormGroup;

  get notesArray(): FormArray {
    return this.editRadioForm.get('notes') as FormArray;
  }
    
  constructor(
    private formBuilder: FormBuilder,
    private radioService: RadioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  loadRadio(id: string): void {
    this.radioService.querySingleRadio(id).valueChanges
    .subscribe(( { data }) => {
      console.log(data)
      this.radio = data.radio;
      this.populateForm();
    })
  }

  populateForm() {
    this.editRadioForm.patchValue({
      orgName: this.radio.orgName,
      location: this.radio.locationName,
      datePurchased: new Date(parseInt(this.radio.datePurchased)),
      dateEntered: new Date(parseInt(this.radio.dateEntered)),
      inventoryNumber: this.radio.inventoryNumber,
      make: this.radio.make,
      model: this.radio.model,
      progChannels: this.radio.progChannels,
      serialNumber: this.radio.serialNumber,
      warranty: new Date(parseInt(this.radio.warranty)),
      refurb: this.radio.refurb.toString(),
      radioType: this.radio.radioType

    })

    this.radio.notes.forEach(note => {
      (this.editRadioForm.get('notes') as FormArray).push(this.formBuilder.control(note));
    })
  }

  addNote() {
    this.notesArray.push(this.formBuilder.control(' '));
  }

  removeNote(index: number) {
    this.notesArray.removeAt(index);
  }

  updateRadio(updateRadio: UpdateRadioFields): void {
    this.radioService.editRadio(this.radioID, updateRadio).subscribe( {
      next: (result) => {
        const editedRadio = result.data?.editRadio ?? null;

        if(editedRadio) {
          this.toastService.show('Repair Edited successfully', {
            delay: 3000
          })

          this.router.navigate(['/one-radio', editedRadio._id]);


        } else {
          this.router.navigate(['/']);
        }
      }, error: (error) => {
        console.error(error);

        this.toastService.show('Failed to edit radio. Please try again', {
          delay: 3000
        })
      }
    });
  }

  onSubmit() {

    const submittedRadio: UpdateRadioFields = {
      orgName: this.editRadioForm.value.orgName,
      locationName: this.editRadioForm.value.location,
      datePurchased: this.editRadioForm.value.datePurchased,
      dateEntered: this.editRadioForm.value.dateEntered,
      inventoryNumber: this.editRadioForm.value.inventoryNumber,
      make: this.editRadioForm.value.make,
      model: this.editRadioForm.value.model,
      progChannels: this.editRadioForm.value.progChanels,
      notes: Array.isArray(this.editRadioForm.value.notes) ? this.editRadioForm.value.notes : [''],
      serialNumber: this.editRadioForm.value.serialNumber,
      warranty: this.editRadioForm.value.warranty,
      refurb: this.editRadioForm.value.refurb === 'true',
      radioType: this.editRadioForm.value.radioType
      
    }

    this.updateRadio(submittedRadio);
  }


  ngOnInit(): void {

    this.editRadioForm = this.formBuilder.group({
      orgName: '',
      location: '',
      datePurchased: new FormControl(new Date()),
      dateEntered: new FormControl(new Date()),
      inventoryNumber: '',
      make: '',
      model: '',
      progChannels: '',
      notes: this.formBuilder.array([]),
      serialNumber: '',
      warranty: new FormControl(new Date()),
      refurb: false,
      radioType: '',
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.radioID = params['id'];
      this.loadRadio(this.radioID);
    })
      
  };

}
