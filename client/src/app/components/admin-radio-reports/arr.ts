import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { ApolloError } from '@apollo/client/errors';
import { Radio } from '@app/graphql/schemas/typeInterfaces';
import { RadioService } from '@app/services/radios/radio.service';
import { Observable, BehaviorSubject, combineLatest, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './arr.html',
})
export class AdminRadioReportsComponent implements OnInit {
  private queryParams$: BehaviorSubject<any> = new BehaviorSubject({});
  queryParams: Observable<any> = this.queryParams$.asObservable();

  dataItems$!: Observable<Radio[]>;
  dataLoading$!: Observable<boolean>;
  dataError$!: Observable<any>;

  constructor(private route: ActivatedRoute, private radioService: RadioService) {}

  ngOnInit() {
    

  }


  
}





