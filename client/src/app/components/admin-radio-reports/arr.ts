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
    // Combine route param changes and queryParams$ changes
    combineLatest([this.route.paramMap, this.queryParams$])
      .pipe(
        switchMap(([params, queryParams]) => {
          const id = params.get('id');
          const organization = params.get('organization');
          if (id) {
            this.queryParams$.next({ id });
          } else if (organization) {
            this.queryParams$.next({ organization });
          } else {
            // Default to "query all" when no params are present
            this.queryParams$.next({});
          }

          // Call the Apollo service methods based on queryParams
          if (queryParams.id) {
            this.radioService.querySingleRadio(queryParams.id).valueChanges.pipe(
                catchError(( error: ApolloError) => {
                    this.dataError$ = throwError(() => error);
                    return throwError(() => error)
                }),
                map(( { data } ) => this.dataItems$ = of([data.radio]))
            )
          } else if (queryParams.organization) {
            this.radioService.orgRadios(queryParams.orgName).valueChanges.pipe(
                catchError(( error: ApolloError) => {
                    this.dataError$ = throwError(() => error);
                    return throwError(() => error)
                }),
                map(( { data }) => this.dataItems$ = of(data.orgRadios))
            )
          } else {
            this.radioService.allRadios().valueChanges.pipe(
                catchError(( error: ApolloError) => {
                    this.dataError$ = throwError(() => error);
                    return throwError(() => error)
                }),
                map(( { data } ) => this.dataItems$ = of(data.radios))
            )
          }
        })
      )
  }
}





