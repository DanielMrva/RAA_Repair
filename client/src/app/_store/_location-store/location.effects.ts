import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LocationActions from "./location.actions";
import { Router } from "@angular/router";
import { LocationService } from "@app/services/location/location.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class LocationEffects {
    constructor(
        private actions$: Actions,
        private locationService: LocationService,
        private toastService: ToastService,
        private router: Router
    ) { }

    loadOneLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.loadOneLocation),
            mergeMap(({ locationId }) => {
                console.log('Dispatched loadOneLocation action with ID: ', locationId);
                return this.locationService.querySingleLocation(locationId).valueChanges.pipe(
                    map(({ data }) => {
                        console.log('Loaded oneLocation data: ', data.location);
                        return LocationActions.loadOneLocationSuccess({ location: data.location });
                    }),
                    catchError((error) => {
                        console.error('Error loading oneLocation: ', error);
                        return of(LocationActions.loadOneLocationFailure({ error }));
                    })
                );
            })
        )
    );

    loadLocationByName$ = createEffect(() =>
    this.actions$.pipe(
        ofType(LocationActions.loadLocationByName),
        mergeMap(({ locationName }) => {
            console.log('Dispatched loadLocationByName action with Name: ', locationName);
            return this.locationService.queryLocationByName(locationName).valueChanges.pipe(
                map(({ data }) => {
                    console.log('Loaded Location by Name data: ', data.locationByName);
                    return LocationActions.loadLocationByNameSuccess({ location: data.locationByName });
                }),
                catchError((error) => {
                    console.error('Error loading Location by Name: ', error);
                    return of(LocationActions.loadLocationByNameFailure({ error }));
                })
            );
        })
    )
);


    loadAllLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.loadAllLocations),
            switchMap(() =>
                from(this.locationService.allLocations().valueChanges).pipe(
                    map(({ data }) => LocationActions.loadAllLocationsSuccess({ locations: data.allLocations })),

                    catchError((error) => of(LocationActions.loadAllLocationsFailure({ error })))

                )
            )
        )
    );

    loadOrgLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.loadOrgLocations),
            switchMap(({ orgName }) =>
                from(this.locationService.orgLocations(orgName).valueChanges).pipe(
                    map(({ data }) => LocationActions.loadOrgLocationsSuccess({ locations: data.orgLocations })),

                    catchError((error) => of(LocationActions.loadOrgLocationsFailure({ error })))
                )
            )
        )
    );



    addLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.addLocation),
            switchMap(({
                locationName,
                orgName,
                street,
                suite,
                city,
                state,
                zip,
                country,
                phone,
                contactEmail,
                primaryContact
   
            }) =>
                from(this.locationService.addLocation(
                    locationName,
                    orgName,
                    street,
                    suite,
                    city,
                    state,
                    zip,
                    country,
                    phone,
                    contactEmail,
                    primaryContact
                )).pipe(
                    map(({ data }) => LocationActions.addLocationSuccess({ location: data?.addLocation })),

                    catchError((error) => of(LocationActions.addLocationFailure({ error })))
                )
            )
        )
    );

    addLocationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.addLocationSuccess),
            map(({ location }) => {
                this.toastService.show('Location added successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-location', location?._id])
            })
        ),
        { dispatch: false }
    );

    addLocationFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.addLocationFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit Location. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.editLocation),
            switchMap(({ id, updates }) =>
                from(this.locationService.editLocation(id, updates)).pipe(
                    map(({ data }) =>
                        LocationActions.editLocationSuccess({ location: data?.editLocation })),

                    catchError((error) => of(LocationActions.editLocationFailure({ error })))
                )

            )
        )
    );

    editLocationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.editLocationSuccess),
            map(({ location }) => {
                this.toastService.show('Location edited successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-Location', location?._id])
            })
        ),
        { dispatch: false }
    );

    editLocationFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.editLocationFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit Location. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    loadLocationNames$ = createEffect(() =>
    this.actions$.pipe(
        ofType(LocationActions.loadLocationNames),
        switchMap(() =>
            from(this.locationService.locationNames()).pipe(
                map(({ data }) => LocationActions.loadLocationNamesSuccess({ locationNames: data.locationNames })),

                catchError((error) => of(LocationActions.loadLocationNamesFailure({ error })))
            )
        )

    )
)
}