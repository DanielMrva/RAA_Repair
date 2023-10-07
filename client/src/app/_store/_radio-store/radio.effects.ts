import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RadioActions from "./radio.actions";
import { RadioService } from "@app/services/radios/radio.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class RadioEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private radioService: RadioService
    ) {}

    loadSerialRadio$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.loadSerialRadio),
            switchMap(( { serialNumber } ) => 
                from(this.radioService.querySerialRadio(serialNumber).valueChanges).pipe(
                    map(( { data }) => RadioActions.loadSerialRadioSuccess({ radio: data.radio})),

                    catchError((error) => of(RadioActions.loadSerialRadioFailure({ error})))
                )
            )
        )
    );

    loadOneRadio$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.loadOneRadio),
            switchMap(( { radioId } ) => 
                from(this.radioService.querySingleRadio(radioId).valueChanges).pipe(
                    map(( { data }) => RadioActions.loadOneRadioSuccess({ radio: data.radio })),

                    catchError((error) => of(RadioActions.loadOneRadioFailure({ error })))
                )
            )
        )
    );

    loadAllRadios$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.loadAllRadios),
            switchMap(() => 
                from(this.radioService.allRadios().valueChanges).pipe(
                    map(( { data }) => RadioActions.loadAllRadiosSuccess({ radios: data.radios})),

                    catchError((error) => of(RadioActions.loadAllRadiosFailure({ error })))

                )
            )
        )
    );

    loadOrgRadios$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.loadOrgRadios),
            switchMap(( { orgName }) => 
                from(this.radioService.orgRadios(orgName).valueChanges).pipe(
                    map(( { data }) => RadioActions.loadOrgRadiosSuccess({ radios: data.orgRadios })),

                    catchError((error) => of(RadioActions.loadOrgRadiosFailure({ error })))
                )
            )
        )
    );

    addRadio$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.addRadio),
            switchMap(( {   
                            orgName, 
                            location, 
                            dateSold, 
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
                                                    location,
                                                    dateSold,
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
                                                        map(( { data }) => RadioActions.addRadioSuccess({ radio: data?.addRadio})),

                                                        catchError((error) => of(RadioActions.addRadioFailure({ error })))
                            )
                        )
        )
    );

    editRadio$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RadioActions.editRadio),
            switchMap(( { id, updates}) => 
                from(this.radioService.editRadio(id, updates)).pipe(
                    map(( { data }) => 
                        RadioActions.editRadioSuccess({ radio: data?.editRadio})),

                    catchError((error) => of(RadioActions.editRadioFailure({ error })))
                )
            
            )
        )
    );
} 
