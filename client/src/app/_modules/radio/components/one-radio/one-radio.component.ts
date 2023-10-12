import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadioService } from '@app/services/radios/radio.service'
import { Radio } from '@app/graphql/schemas/typeInterfaces';

@Component({
  selector: 'app-one-radio',
  templateUrl: './one-radio.component.html',
  styleUrls: ['./one-radio.component.css']
})
export class OneRadioComponent implements OnInit{

  radio: Radio | undefined;

  constructor(
    private route: ActivatedRoute,
    private radioService: RadioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const radioId = params['id'];
      this.loadRadio(radioId)
    });
  }

  loadRadio(radioId: string): void {
    this.radioService.querySingleRadio(radioId).valueChanges
    .subscribe(({ data }) => {
      this.radio = data.radio;
    });
  }


}
