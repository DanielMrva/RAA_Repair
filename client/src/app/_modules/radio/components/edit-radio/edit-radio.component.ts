import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Radio, UpdateRadioFields } from '@app/graphql/schemas/typeInterfaces';
import { AppState } from '@app/_store/app.state';
import { Store } from '@ngrx/store';
import { editRadio, loadOneRadio } from '@app/_store/_radio-store/radio.actions';
import { selectOneRadio, radioErrorSelector, radioLoadingSelector } from '@app/_store/_radio-store/radio.selectors';

@Component({
  selector: 'app-edit-radio',
  templateUrl: './edit-radio.component.html',
  styleUrls: ['./edit-radio.component.css']
})
export class EditRadioComponent implements OnInit{

  editRadioForm = new FormGroup({
    orgName: new FormControl<string>(''),
    location: new FormControl<string>(''),
    dateSold: new FormControl<Date>(new Date()),
    dateEntered: new FormControl<Date>(new Date()),
    inventoryNumber: new FormControl<string>(''),
    make: new FormControl<string>(''),
    model: new FormControl<string>(''),
    progChannels: new FormControl<string>(''),
    notes: new FormArray([]),
    serialNumber: new FormControl<string>(''),
    warranty: new FormControl<Date>(new Date()),
    refurb: new FormControl<boolean>(false, { nonNullable: true }),
    radioType: new FormControl<string>(''),
  })

  isLoading$ = this.store.select(radioLoadingSelector);
  radioError$ = this.store.select(radioErrorSelector);
  oneRadio$ = this.store.select(selectOneRadio);

  radioId!: string;

  get notesArray(): FormArray {
    return this.editRadioForm.get('notes') as FormArray;
  }
    
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  loadRadio(id: string): void {

    this.store.dispatch(loadOneRadio({radioId: id}))
  };

  populateForm() {

    this.oneRadio$.subscribe((radio: Radio | null) => {
      if (radio) {
      this.editRadioForm.patchValue({
          orgName: radio.orgName,
          location: radio.location,
          dateSold: new Date(parseInt(radio.dateSold)),
          dateEntered: new Date(parseInt(radio.dateEntered)),
          inventoryNumber: radio.inventoryNumber,
          make: radio.make,
          model: radio.model,
          progChannels: radio.progChannels,
          serialNumber: radio.serialNumber,
          warranty: new Date(parseInt(radio.warranty)),
          refurb: radio.refurb,
          radioType: radio.radioType
        });

        radio.notes.forEach(note => {
          (this.editRadioForm.get('notes') as FormArray).push(this.formBuilder.control(note));
        });

      }
    })
  };

  addNotes() {
    this.notesArray.push(new FormControl<string>('', { nonNullable: true}));
  };

  removeNote(index: number) {
    this.notesArray.removeAt(index);
  };

  updateRadio(updateRadio: UpdateRadioFields): void {

    this.oneRadio$.subscribe((radio: Radio | null) => {
      if (radio) {
        this.radioId = radio._id
      }
    })

    this.store.dispatch(editRadio({id: this.radioId, updates: updateRadio}))
  }

  onSubmit() {

    const orgName = this.editRadioForm.value.orgName ?? '';
    const location = this.editRadioForm.value.location ?? '';
    const dateSold = this.editRadioForm.value.dateSold ?? new Date();
    const dateEntered = this.editRadioForm.value.dateEntered ?? new Date();
    const inventoryNumber = this.editRadioForm.value.inventoryNumber ?? '';
    const make = this.editRadioForm.value.make ?? '';
    const model = this.editRadioForm.value.model ?? '';
    const progChannels = this.editRadioForm.value.progChannels ?? '';
    const notes = Array.isArray(this.editRadioForm.value.notes) ? this.editRadioForm.value.notes.map(note => note ?? '') : [''];    
    const serialNumber = this.editRadioForm.value.serialNumber ?? '';
    const warranty = this.editRadioForm.value.warranty ?? new Date();
    const refurb = this.editRadioForm.value.refurb ?? false;
    const radioType = this.editRadioForm.value.radioType ?? '';

    const submittedRadio: UpdateRadioFields = {
      orgName: orgName,
      location: location,
      dateSold: new Date(dateSold),
      dateEntered: new Date(dateEntered),
      inventoryNumber: inventoryNumber,
      make: make,
      model: model,
      progChannels: progChannels,
      notes: notes,
      serialNumber: serialNumber,
      warranty: new Date(warranty),
      refurb: refurb,
      radioType: radioType
      
    }

    this.updateRadio(submittedRadio);
  }


  ngOnInit(): void {

    this.editRadioForm.patchValue({
      orgName: '',
      location: '',
      dateSold: new Date(),
      dateEntered: new Date(),
      inventoryNumber: '',
      make: '',
      model: '',
      progChannels: '',
      notes: [],
      serialNumber: '',
      warranty: new Date(),
      refurb: false,
      radioType: ''
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.radioId = params['id'];
      this.loadRadio(this.radioId);
    })

    this.populateForm();

      
  };


}
