import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LocationActions from "./location.actions";
import { loadAllOrgs, loadLikeOrgs } from "../_org-store/org.actions";
import { Router } from "@angular/router";
import { LocationService } from "@app/services/location/location.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class LocationEffects {
    constructor(
        private actions$: Actions,
        private locationService: LocationService,
        private toastService: ToastService,
        private router: Router,
        private store: Store<AppState>
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
            mergeMap(({ orgName, locationName }) => {
                console.log('Dispatched loadLocationByName action with Name: ', locationName);
                return this.locationService.queryLocationByName(orgName, locationName).valueChanges.pipe(
                    map(({ data }) => {
                        console.log('Loaded Location by Name data: ', data.locationByName);
                        return LocationActions.loadLocationByNameSuccess({ locations: [data.locationByName] });
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
            tap(({ location }) => {
                this.toastService.show('Location added successfully!', { delay: 3000 });
                this.router.navigate(['one-location', location?._id]);
            }),
            switchMap(() => [
                loadAllOrgs(),  // Refetch all orgs to ensure data freshness
            ])
        ),
        { dispatch: true }

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
            tap(({ location }) => {
                this.toastService.show('Location edited successfully!', { delay: 3000 });
                this.router.navigate(['one-locaiton', location?._id]);
            }),
            switchMap(() => [
                loadAllOrgs(),  // Refetch all orgs to ensure data freshness
            ])
        ),
        { dispatch: true }
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
    );

    deleteLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.deleteLocation),
            switchMap(({ id }) =>
                from(this.locationService.deleteLocation(id)).pipe(
                    map(({ data }) =>
                        LocationActions.deleteLocationSuccess({ location: data?.deleteLocation })),

                    catchError((error) => of(LocationActions.deleteLocationFailure({ error })))
                )
            )
        )
    );

    deleteLocationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.deleteLocationSuccess),
            map(({ location }) => {
                this.toastService.show('Location deleted successfully!', { delay: 3000 });
                if (location) {
                    this.store.dispatch(loadLikeOrgs({ orgName: location?.orgName }))

                }
                this.router.navigateByUrl(`/location-results/${location?.orgName}/${location?.locationName}`);
            })
        ),
        { dispatch: false }
    );

    deleteLocationFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationActions.deleteLocationFailure),
            map(({ error }) => {
                this.toastService.show(`Location deletion failed: ${error}`, {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

}