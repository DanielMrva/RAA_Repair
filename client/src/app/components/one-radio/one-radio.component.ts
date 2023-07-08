import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { QUERY_SINGLERADIO } from '@app/graphql/schemas';
import { Radio } from '@app/graphql/schemas/typeInterfaces';


@Component({
  selector: 'app-one-radio',
  templateUrl: './one-radio.component.html',
  styleUrls: ['./one-radio.component.css']
})
export class OneRadioComponent implements OnInit {

  radio: Radio | undefined;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const radioId = params['id'];
      this.loadRadio(radioId)
    });
  }

  loadRadio(radioId: string): void {
    this.apollo.query<{ radio: Radio }>({
      query: QUERY_SINGLERADIO,
      variables: {
        radioId
      }
    })
    .subscribe(({ data }) => {
      this.radio = data.radio;
    });
  }
}
