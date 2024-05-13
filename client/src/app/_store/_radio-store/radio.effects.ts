import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RadioActions from "./radio.actions";
import { Router } from "@angular/router";
import { RadioService } from "@app/services/radios/radio.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class RadioEffects {
    constructor(
        private actions$: Actions,
        private radioService: RadioService,
        private toastService: ToastService,
        private router: Router
    ) { }

    loadSerialRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadSerialRadio),
            mergeMap(({ serialNumber, model }) =>
                from(this.radioService.querySerialRadio(serialNumber, model).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadSerialRadioSuccess({ serialRadio: data.serialRadio })),

                    catchError((error) => of(RadioActions.loadSerialRadioFailure({ error })))
                )
            )
        )
    );

    loadLikeSerialRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadLikeSerialRadio),
            mergeMap(({ serialNumber, model }) =>
                from(this.radioService.queryLikeSerialRadio(serialNumber, model).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadLikeSerialRadioSuccess({ serialRadio: data.likeSerialRadio })),

                    catchError((error) => of(RadioActions.loadLikeSerialRadioFailure({ error })))
                )
            )
        )
    );

    loadOneRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadOneRadio),
            mergeMap(({ radioID }) => {
                console.log('Dispatched loadOneRadio action with ID: ', radioID);
                return this.radioService.querySingleRadio(radioID).valueChanges.pipe(
                    map(({ data }) => {
                        // console.log('Loaded oneRadio data: ', data.radio);
                        return RadioActions.loadOneRadioSuccess({ radio: data.radio });
                    }),
                    catchError((error) => {
                        console.error('Error loading oneRadio: ', error);
                        return of(RadioActions.loadOneRadioFailure({ error }));
                    })
                );
            })
        )
    );


    loadAllRadios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadAllRadios),
            switchMap(() =>
                from(this.radioService.allRadios().valueChanges).pipe(
                    map(({ data }) => RadioActions.loadAllRadiosSuccess({ radios: data.allRadios })),

                    catchError((error) => of(RadioActions.loadAllRadiosFailure({ error })))

                )
            )
        )
    );

    loadOrgRadios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadOrgRadios),
            switchMap(({ orgName }) =>
                from(this.radioService.orgRadios(orgName).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadOrgRadiosSuccess({ radios: data.orgRadios })),

                    catchError((error) => of(RadioActions.loadOrgRadiosFailure({ error })))
                )
            )
        )
    );

    loadLikeOrgRadios$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.loadLikeOrgRadios),
            switchMap(( { orgName }) => 
                from(this.radioService.likeOrgRadios(orgName).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadLikeOrgRadiosSuccess({ radios: data.likeOrgRadios})),

                    catchError((error) => of(RadioActions.loadLikeOrgRadiosFailure({ error })))
                )
            )
        )
    );



    addRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadio),
            switchMap(({
                orgName,
                locationName,
                datePurchased,
                dateEntered,
                inventoryNumber,
                make,
                model,
                progChannels,
                notes,
                serialNumber,
                warranty,
                refurb,
                radioType
            }) =>
                from(this.radioService.addRadio(
                    orgName,
                    locationName,
                    datePurchased,
                    dateEntered,
                    inventoryNumber,
                    make,
                    model,
                    progChannels,
                    notes,
                    serialNumber,
                    warranty,
                    refurb,
                    radioType
                )).pipe(
                    map(({ data }) => RadioActions.addRadioSuccess({ radio: data?.addRadio })),

                    catchError((error) => of(RadioActions.addRadioFailure({ error })))
                )
            )
        )
    );

    addRadioSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadioSuccess),
            map(({ radio }) => {
                this.toastService.show('Radio added successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-radio', radio?._id])
            })
        ),
        { dispatch: false }
    );

    addRadioFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadioFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit radio. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadio),
            switchMap(({ id, updates }) =>
                from(this.radioService.editRadio(id, updates)).pipe(
                    map(({ data }) =>
                        RadioActions.editRadioSuccess({ radio: data?.editRadio })),

                    catchError((error) => of(RadioActions.editRadioFailure({ error })))
                )

            )
        )
    );

    editRadioSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadioSuccess),
            map(({ radio }) => {
                this.toastService.show('Radio edited successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-radio', radio?._id])
            })
        ),
        { dispatch: false }
    );

    editRadioFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadioFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit radio. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
} 
